# myDATA spec pipeline

Turns the official AADE myDATA PDFs into the markdown under `docs/`, and keeps
the upstream PDFs/XSDs checked in as a provenance record.

AADE publishes the specification as Greek-only PDFs plus a zip of XSDs. There is
no machine-readable release feed and no official English text, so this pipeline
scrapes the version index, converts the PDFs, recovers their tables, and applies
a locked glossary to produce the English copy.

## Usage

```bash
npm run spec:check     # what is the latest published version, is it fetched?
npm run spec:build     # fetch -> convert -> structure -> translate
npm run test:spec      # pipeline unit tests
```

Individual stages, for iterating without re-downloading:

```bash
npm run spec -- fetch
npm run spec -- convert   [--version=2.0.1]
npm run spec -- structure [--version=2.0.1]
npm run spec -- translate [--version=2.0.1]
```

Requires `pdftotext` (poppler): `brew install poppler`, or
`apt-get install poppler-utils`.

## Stages

| Stage | Input | Output |
| :--- | :--- | :--- |
| fetch | version index page | `spec/v<x>/` PDFs, XSD zip, xlsx, `manifest.json` |
| convert | PDFs | `spec/v<x>/text/*.txt` |
| structure | text | `spec/v<x>/structured/*.md` (Greek) |
| translate | structured markdown | `docs/*-gr.md`, `docs/*-en.md` |

Stages are independently re-runnable, so a glossary change only needs
`translate` and a parser change only needs `structure`.

## What is tracked

Tracked: the upstream PDFs, the XSD zip, the xlsx, and `manifest.json` (which
records each asset's SHA-256). Those pin exactly which bytes a doc was derived
from. Ignored: `text/`, `structured/` and `untranslated.json`, all regenerable.

## Table recovery

The spec's tables have no ruling characters, so `pdftotext -layout` is used and
columns are recovered from horizontal text position. The awkward parts, each
covered by a test in `tests/structure.test.ts`:

- Column offsets differ per table and are re-derived from every header row.
- Rows drift horizontally relative to their header, so a chunk is assigned to
  the nearest column start, and columns are claimed left to right so a drifted
  cell cannot fall back into the previous column.
- Cells wrap over several lines; a line that fills only later columns continues
  the current record rather than starting a new one.
- A table continues across a page break, where the header is restated and
  running headers/footers interrupt the rows.
- Appendix code tables centre their code column, so indentation cannot separate
  records there and a leading bare integer is used instead.
- Explanatory notes after a table are indented like continuation lines and must
  explicitly terminate the table.

## Glossary

`glossary.json` is a locked GR->EN term list, applied longest-match-first and
anchored so a term is not substituted inside a longer Greek word (otherwise
"Ποσότητας" becomes "Quantityς").

Its purpose is that a term renders identically in every version, so diffing two
spec releases shows real specification changes rather than reworded prose.
**Extend it rather than rewording existing entries** — a reword rewrites the
whole doc in the next diff.

Anything uncovered stays in Greek and is reported to
`spec/v<x>/untranslated.json`, ordered by frequency. That file is the work list
for extending the glossary; the docs are usable before it is empty because
field names, types and enum codes are already Latin.

## Adding a new spec version

`npm run spec:check` reports the published version. If it is new, run
`npm run spec:build`, then review `git diff docs/` — that diff is the upgrade's
scope. Asset URLs are discovered from the index page, so a new release needs no
code change unless AADE renames things; `ASSET_MATCHERS` in `src/fetch.ts` is
the one place to adjust if they do.
