import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { convertRelease } from './convert';
import { discoverRelease, fetchRelease, VERSION_INDEX_URL } from './fetch';
import { parseTables, renderMarkdown } from './structure';
import { loadGlossary, translate } from './translate';
import type { Manifest } from './types';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const SPEC_ROOT = path.join(REPO_ROOT, 'spec');
const DOCS_ROOT = path.join(REPO_ROOT, 'docs');
const GLOSSARY = path.join(REPO_ROOT, 'tools', 'spec-pipeline', 'glossary.json');

const PDF_TITLES: Record<string, string> = {
  erp: 'myDATA REST API — ERP users',
  providers: 'myDATA REST API — e-Invoicing providers',
  'delivery-note': 'myDATA REST API — Digital Delivery Note'
};

function specDir(version: string): string {
  return path.join(SPEC_ROOT, `v${version}`);
}

async function readManifest(version: string): Promise<Manifest> {
  const p = path.join(specDir(version), 'manifest.json');
  if (!existsSync(p)) {
    throw new Error(`No manifest for v${version}. Run \`fetch\` first.`);
  }
  return JSON.parse(await readFile(p, 'utf8'));
}

async function resolveVersion(explicit?: string): Promise<string> {
  if (explicit) return explicit;
  const release = await discoverRelease();
  return release.version;
}

async function cmdCheck(): Promise<void> {
  const release = await discoverRelease();
  console.log(`Latest published version: v${release.version}`);
  console.log(`Source: ${VERSION_INDEX_URL}`);
  for (const a of release.assets) console.log(`  ${a.id.padEnd(28)} ${a.url}`);

  const local = existsSync(specDir(release.version));
  console.log(
    local
      ? `\nAlready fetched: spec/v${release.version}`
      : `\nNOT fetched yet. Run: npm run spec:fetch`
  );
}

async function cmdFetch(version?: string): Promise<void> {
  const release = await discoverRelease();
  if (version && version !== release.version) {
    throw new Error(
      `Only the current published version (v${release.version}) can be fetched ` +
        `from the index page; v${version} would need its own archive URL.`
    );
  }
  console.log(`Fetching v${release.version}...`);
  const manifest = await fetchRelease(release, SPEC_ROOT);
  console.log(`Wrote spec/v${manifest.version}/manifest.json`);
}

async function cmdConvert(versionArg?: string): Promise<void> {
  const version = await resolveVersion(versionArg);
  const manifest = await readManifest(version);
  const pdfIds = manifest.assets.filter(a => a.kind === 'pdf').map(a => a.id);
  console.log(`Converting v${version}...`);
  await convertRelease(specDir(version), pdfIds);
}

async function cmdStructure(versionArg?: string): Promise<void> {
  const version = await resolveVersion(versionArg);
  const manifest = await readManifest(version);
  const dir = specDir(version);
  const outDir = path.join(dir, 'structured');
  await mkdir(outDir, { recursive: true });

  console.log(`Structuring v${version}...`);
  for (const asset of manifest.assets.filter(a => a.kind === 'pdf')) {
    const textPath = path.join(dir, 'text', `${asset.id}.txt`);
    if (!existsSync(textPath)) {
      throw new Error(`Missing ${textPath}. Run \`convert\` first.`);
    }
    const blocks = parseTables(await readFile(textPath, 'utf8'));
    const title = `${PDF_TITLES[asset.id] ?? asset.id} (v${version})`;
    await writeFile(
      path.join(outDir, `${asset.id}.md`),
      renderMarkdown(blocks, title),
      'utf8'
    );
    const rows = blocks.reduce((n, b) => n + b.rows.length, 0);
    console.log(`  ${asset.id}: ${blocks.length} tables, ${rows} rows`);
  }
}

async function cmdTranslate(versionArg?: string): Promise<void> {
  const version = await resolveVersion(versionArg);
  const manifest = await readManifest(version);
  const dir = specDir(version);
  const glossary = await loadGlossary(GLOSSARY);
  await mkdir(DOCS_ROOT, { recursive: true });

  console.log(`Translating v${version}...`);
  const report: Record<string, { text: string; count: number }[]> = {};

  for (const asset of manifest.assets.filter(a => a.kind === 'pdf')) {
    const src = path.join(dir, 'structured', `${asset.id}.md`);
    if (!existsSync(src)) {
      throw new Error(`Missing ${src}. Run \`structure\` first.`);
    }
    const greek = await readFile(src, 'utf8');
    const stem = `mydata-${asset.id}-doc-v${version}`;
    await writeFile(path.join(DOCS_ROOT, `${stem}-gr.md`), greek, 'utf8');

    const result = translate(greek, glossary);
    await writeFile(path.join(DOCS_ROOT, `${stem}-en.md`), result.text, 'utf8');

    report[asset.id] = result.untranslated.slice(0, 100);
    const remaining = result.untranslated.reduce((n, u) => n + u.count, 0);
    console.log(
      `  ${asset.id}: ${result.untranslated.length} untranslated terms ` +
        `(${remaining} occurrences)`
    );
  }

  await writeFile(
    path.join(dir, 'untranslated.json'),
    JSON.stringify(report, null, 2) + '\n',
    'utf8'
  );
  console.log(`Glossary gaps: spec/v${version}/untranslated.json`);
}

async function cmdAll(versionArg?: string): Promise<void> {
  await cmdFetch(versionArg);
  const version = await resolveVersion(versionArg);
  await cmdConvert(version);
  await cmdStructure(version);
  await cmdTranslate(version);
}

const USAGE = `myDATA spec pipeline

  check       report the latest published version and whether it is fetched
  fetch       download PDFs + XSDs + xlsx into spec/v<version>/
  convert     PDF -> text (requires pdftotext)
  structure   text -> Greek markdown with recovered tables
  translate   Greek markdown -> docs/*-gr.md and docs/*-en.md
  all         run every stage in order

Options:
  --version=<x.y.z>   operate on an already-fetched version
`;

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args.find(a => !a.startsWith('-')) ?? 'check';
  const version = args
    .find(a => a.startsWith('--version='))
    ?.split('=')[1];

  switch (command) {
    case 'check':
      return cmdCheck();
    case 'fetch':
      return cmdFetch(version);
    case 'convert':
      return cmdConvert(version);
    case 'structure':
      return cmdStructure(version);
    case 'translate':
      return cmdTranslate(version);
    case 'all':
      return cmdAll(version);
    default:
      console.log(USAGE);
      process.exitCode = 1;
  }
}

main().catch(err => {
  console.error(`\nError: ${err.message}`);
  process.exitCode = 1;
});
