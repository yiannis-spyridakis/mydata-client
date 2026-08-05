import type { CodeRow, FieldRow, TableBlock } from './types';

/**
 * Table recovery from `pdftotext -layout` output.
 *
 * The spec's tables have no ruling characters; the only structure is horizontal
 * text position. Each table restates its header row, and column offsets differ
 * from table to table (and again after a page break), so offsets are re-derived
 * from every header encountered rather than assumed globally.
 *
 * A logical row starts at a line with text in column 0 and continues through
 * following lines that only fill later columns — that is how a wrapped cell is
 * distinguished from the next record.
 */

/** Repeated running header/footer that interrupts rows mid-table. */
const PAGE_FURNITURE = [
  /^\s*myDATA\s+REST\s+API\s*$/i,
  /^\s*myDATA\s+REST\s+API\s+\d+\s*$/i,
  /^\s*\d+\s*$/,
  /^\s*Πίνακας\s+περιεχομένων/i
];

const FIELD_HEADER_LABELS = ['Πεδίο', 'Field'];
const CODE_HEADER_LABELS = ['Κωδικός', 'Code'];

/**
 * Explanatory prose that follows a table. It is indented like a continuation
 * line, so without an explicit terminator it would be absorbed into the last
 * row's cells.
 */
const TABLE_TERMINATORS = [
  /^\s*Παρατηρήσεις\s*:/i,
  /^\s*Notes\s*:/i,
  /^\s*Σημει(ώ|ω)σ(η|εις)\s*:/i,
  // Numbered note item, e.g. "1) Οι τιμές ...". A bare "1" is a code-table row.
  /^\s*\d+\)\s+\S/,
  // Next section heading, e.g. "5.4.1 Δήλωση ...". Requires a dotted number so
  // it cannot match a single-integer code row.
  /^\s*\d+\.\d+(\.\d+)*\s+\D/
];

function isTableTerminator(line: string): boolean {
  return TABLE_TERMINATORS.some(re => re.test(line));
}

export interface ColumnLayout {
  starts: number[];
  labels: string[];
}

export function isPageFurniture(line: string): boolean {
  if (line.trim() === '') return false;
  return PAGE_FURNITURE.some(re => re.test(line));
}

/**
 * Column starts are the offsets of each run of non-space text in the header
 * line. Two or more spaces separate columns; a single space may occur inside a
 * label such as "Αποδεκτές τιμές".
 */
export function detectColumns(headerLine: string): ColumnLayout {
  const starts: number[] = [];
  const labels: string[] = [];
  const re = /\S+(?: \S+)*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(headerLine)) !== null) {
    const label = m[0].trim();
    if (label === '') continue;
    starts.push(m.index);
    labels.push(label);
  }
  return { starts, labels };
}

function headerKind(line: string): 'field' | 'code' | null {
  const trimmed = line.trim();
  if (FIELD_HEADER_LABELS.some(l => trimmed.startsWith(l))) return 'field';
  if (CODE_HEADER_LABELS.some(l => trimmed.startsWith(l))) return 'code';
  return null;
}

/**
 * Slice a line into cells at the given offsets.
 *
 * Rows drift horizontally relative to the header (the spec justifies text
 * within a cell), so a chunk is assigned to the column whose start is nearest,
 * not to the last column that begins before it. Chunks are whole runs of text
 * separated by two or more spaces, which keeps multi-word cell content
 * together instead of scattering individual words across columns.
 */
export function sliceCells(line: string, starts: number[]): string[] {
  const cells: string[] = new Array(starts.length).fill('');
  const chunks: { at: number; text: string }[] = [];
  const re = /\S+(?: \S+)*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    chunks.push({ at: m.index, text: m[0].trim() });
  }

  // Chunks run left to right, so once one claims a column no later chunk may
  // claim it again; otherwise a cell that drifts left of its header offset
  // gets pulled back into the previous column.
  let floor = 0;
  for (const chunk of chunks) {
    let col = floor;
    let best = Number.MAX_SAFE_INTEGER;
    for (let i = floor; i < starts.length; i++) {
      const d = Math.abs(chunk.at - starts[i]);
      if (d < best) {
        best = d;
        col = i;
      }
    }
    cells[col] = cells[col] ? `${cells[col]} ${chunk.text}` : chunk.text;
    floor = col + 1;
  }
  return cells.map(c => c.replace(/\s+/g, ' ').trim());
}

/** Offsets of each whitespace-separated chunk on a line. */
export function chunkOffsets(line: string): number[] {
  const offsets: number[] = [];
  const re = /\S+(?: \S+)*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) offsets.push(m.index);
  return offsets;
}

/**
 * Prefer the offsets observed on the record's own first line, falling back to
 * the header wherever the record supplied no chunk for a column.
 */
export function alignStarts(
  headerStarts: number[],
  rowStarts: number[],
  columns: number
): number[] {
  if (rowStarts.length !== columns) return headerStarts;
  return headerStarts.map((h, i) => (rowStarts[i] !== undefined ? rowStarts[i] : h));
}

/**
 * True when the line begins a new record rather than continuing one.
 *
 * Code tables centre their code column, so successive codes are indented
 * differently and indentation alone cannot separate them; a leading bare
 * integer is the reliable signal there. Field tables have no such ambiguity
 * because the field name is left-aligned.
 */
function startsRecord(
  line: string,
  starts: number[],
  kind: 'field' | 'code'
): boolean {
  const indent = line.search(/\S/);
  if (indent === -1) return false;

  if (kind === 'code') {
    const first = line.trim().split(/\s{2,}|\s/)[0];
    return /^\d+(\.\d+)?$/.test(first);
  }

  const firstColEnd = starts.length > 1 ? starts[1] : Number.MAX_SAFE_INTEGER;
  return indent <= starts[0] + 2 && indent < firstColEnd;
}

function joinCell(existing: string, addition: string): string {
  if (!addition) return existing;
  if (!existing) return addition;
  // Hyphenated line-break in the source is rejoined without a space.
  if (existing.endsWith('-')) return existing.slice(0, -1) + addition;
  return `${existing} ${addition}`;
}

function nearestHeading(lines: string[], index: number): string {
  for (let i = index; i >= 0 && i > index - 60; i--) {
    const t = lines[i].trim();
    // Numbered spec headings, e.g. "5.4 Γραμμές παραστατικού".
    const m = t.match(/^(\d+(?:\.\d+)*)\s+(.{3,120})$/);
    if (m && !/\.{4,}/.test(t)) return `${m[1]} ${m[2]}`.trim();
  }
  return '';
}

export function parseTables(text: string): TableBlock[] {
  const lines = text.split('\n');
  const blocks: TableBlock[] = [];

  let current: TableBlock | null = null;
  let layout: ColumnLayout | null = null;
  let pending: string[] | null = null;
  let rowStarts: number[] = [];

  const flushRow = () => {
    if (!current || !pending) return;
    if (current.kind === 'field') {
      const [field, type, required, description, values] = [
        pending[0] ?? '',
        pending[1] ?? '',
        pending[2] ?? '',
        pending[3] ?? '',
        pending[4] ?? ''
      ];
      if (field) {
        (current.rows as FieldRow[]).push({
          field,
          type,
          required,
          description,
          values
        });
      }
    } else {
      const [code, description] = [pending[0] ?? '', pending.slice(1).join(' — ')];
      if (/^\d/.test(code)) {
        (current.rows as CodeRow[]).push({
          code,
          description: description.trim()
        });
      }
    }
    pending = null;
  };

  const endTable = () => {
    flushRow();
    if (current && current.rows.length > 0) blocks.push(current);
    current = null;
    layout = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isPageFurniture(line)) continue;

    const kind = headerKind(line);
    if (kind) {
      // A restated header continues the same table across a page break.
      const next = detectColumns(line);
      if (current && current.kind === kind && next.starts.length >= 2) {
        flushRow();
        layout = next;
        continue;
      }
      endTable();
      if (next.starts.length >= 2) {
        current = { kind, heading: nearestHeading(lines, i), rows: [] };
        layout = next;
      }
      continue;
    }

    if (!current || !layout) continue;

    if (isTableTerminator(line)) {
      endTable();
      continue;
    }

    if (line.trim() === '') {
      // A single blank line inside a table is usually a page seam; two end it.
      if (lines[i + 1]?.trim() === '' && lines[i + 2]?.trim() === '') endTable();
      continue;
    }

    if (startsRecord(line, layout.starts, current.kind)) {
      flushRow();
      pending = sliceCells(line, layout.starts);
      // A record's own offsets are the better guide for its wrapped lines,
      // since a row may sit consistently left of the header it belongs to.
      rowStarts = chunkOffsets(line);
    } else if (pending) {
      const cells = sliceCells(
        line,
        alignStarts(layout.starts, rowStarts, pending.length)
      );
      for (let c = 0; c < pending.length; c++) {
        pending[c] = joinCell(pending[c], cells[c] ?? '');
      }
    }
  }
  endTable();
  return blocks;
}

function mdEscape(s: string): string {
  return s.replace(/\|/g, '\\|');
}

function renderRow(cells: string[]): string {
  return `| ${cells.map(mdEscape).join(' | ')} |`;
}

export function renderMarkdown(blocks: TableBlock[], title: string): string {
  const out: string[] = [`# ${title}`, ''];
  for (const block of blocks) {
    if (block.heading) out.push(`## ${block.heading}`, '');
    if (block.kind === 'field') {
      out.push(
        renderRow(['Field', 'Type', 'Required', 'Description', 'Values']),
        '| :--- | :--- | :--- | :--- | :--- |'
      );
      for (const r of block.rows as FieldRow[]) {
        out.push(
          renderRow([
            `\`${r.field}\``,
            r.type ? `\`${r.type}\`` : '',
            r.required,
            r.description,
            r.values
          ])
        );
      }
    } else {
      out.push(renderRow(['Code', 'Description']), '| :--- | :--- |');
      for (const r of block.rows as CodeRow[]) {
        out.push(renderRow([r.code, r.description]));
      }
    }
    out.push('');
  }
  return out.join('\n');
}
