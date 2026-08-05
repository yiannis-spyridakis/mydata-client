import { readFile } from 'node:fs/promises';

/**
 * Glossary-based GR->EN pass.
 *
 * This is deliberately NOT a general translator: it guarantees that a term
 * renders identically in every version, so a diff between two spec releases
 * shows real specification changes rather than reworded prose. Anything the
 * glossary does not cover is left in Greek and reported, which doubles as the
 * work list for extending the glossary.
 */

export interface Glossary {
  terms: Record<string, string>;
}

export interface TranslationResult {
  text: string;
  /** Greek fragments no glossary entry covered, most frequent first. */
  untranslated: { text: string; count: number }[];
}

export async function loadGlossary(path: string): Promise<Glossary> {
  const raw = JSON.parse(await readFile(path, 'utf8'));
  return { terms: raw.terms ?? {} };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const GREEK_LETTER = '\\u0370-\\u03ff\\u1f00-\\u1fff';

/**
 * Greek is inflected, so a bare substring replacement turns "Ποσότητας" into
 * "Quantityς". Matching is therefore anchored so a term cannot be replaced
 * when it is only the stem of a longer Greek word; declined forms are handled
 * by adding them to the glossary explicitly.
 */
function termPattern(term: string): RegExp {
  const body = escapeRegExp(term);
  return new RegExp(`(?<![${GREEK_LETTER}])${body}(?![${GREEK_LETTER}])`, 'g');
}

/** Single Greek word. Counting per word keeps the gap report actionable. */
const GREEK_WORD = /[\u0370-\u03ff\u1f00-\u1fff]+/g;

export function translate(text: string, glossary: Glossary): TranslationResult {
  // Longest first so "Δελτίο Αποστολής" wins over "Δελτίο".
  const entries = Object.entries(glossary.terms).sort(
    (a, b) => b[0].length - a[0].length
  );

  let out = text;
  for (const [gr, en] of entries) {
    out = out.replace(termPattern(gr), en);
  }

  const counts = new Map<string, number>();
  for (const m of out.matchAll(GREEK_WORD)) {
    const term = m[0].trim();
    if (term.length < 2) continue;
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }

  return {
    text: out,
    untranslated: [...counts.entries()]
      .map(([t, count]) => ({ text: t, count }))
      .sort((a, b) => b.count - a.count)
  };
}
