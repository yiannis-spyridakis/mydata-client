import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import * as path from 'node:path';

/**
 * `-layout` preserves the horizontal position of text, which is what makes the
 * spec's borderless tables recoverable: every column keeps a stable start
 * offset that the structure stage detects.
 */
const PDFTOTEXT_ARGS = ['-layout', '-enc', 'UTF-8', '-nopgbrk'];

export function assertPdftotext(): void {
  const probe = spawnSync('pdftotext', ['-v'], { encoding: 'utf8' });
  if (probe.error) {
    throw new Error(
      'pdftotext not found. Install poppler: `brew install poppler` (macOS) or ' +
        '`apt-get install poppler-utils` (Debian/Ubuntu).'
    );
  }
}

export function pdfToText(pdfPath: string): string {
  assertPdftotext();
  const res = spawnSync('pdftotext', [...PDFTOTEXT_ARGS, pdfPath, '-'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024
  });
  if (res.status !== 0) {
    throw new Error(`pdftotext failed for ${pdfPath}: ${res.stderr?.trim()}`);
  }
  return res.stdout;
}

export async function convertRelease(
  specDir: string,
  pdfIds: string[]
): Promise<Record<string, string>> {
  const outDir = path.join(specDir, 'text');
  await mkdir(outDir, { recursive: true });

  const out: Record<string, string> = {};
  for (const id of pdfIds) {
    const pdfPath = path.join(specDir, `${id}.pdf`);
    const text = pdfToText(pdfPath);
    const textPath = path.join(outDir, `${id}.txt`);
    await writeFile(textPath, text, 'utf8');
    out[id] = textPath;
    console.log(`  converted ${id} (${text.split('\n').length} lines)`);
  }
  return out;
}
