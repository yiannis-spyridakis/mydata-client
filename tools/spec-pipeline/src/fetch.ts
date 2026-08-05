import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import type { FetchedAsset, Manifest, SpecAsset, SpecRelease } from './types';

export const VERSION_INDEX_URL =
  'https://www.aade.gr/mydata/tehnikes-prodiagrafes-ekdoseis-mydata';

const AADE_ORIGIN = 'https://www.aade.gr';

/**
 * AADE files are served from /sites/default/files/<yyyy-mm>/ and the naming is
 * inconsistent between releases (dots vs spaces in the version, "_official" or
 * "_official_erp" suffixes), so assets are classified by matching loose
 * patterns against the href rather than by reconstructing a canonical name.
 */
const ASSET_MATCHERS: {
  id: string;
  kind: SpecAsset['kind'];
  audience: SpecAsset['audience'];
  test: (href: string) => boolean;
}[] = [
  {
    id: 'erp',
    kind: 'pdf',
    audience: 'erp',
    test: h => /documentation.*erp/i.test(h) && h.endsWith('.pdf')
  },
  {
    id: 'providers',
    kind: 'pdf',
    audience: 'providers',
    test: h => /providers/i.test(h) && h.endsWith('.pdf')
  },
  {
    id: 'delivery-note',
    kind: 'pdf',
    audience: 'delivery-note',
    test: h => /deliverynote/i.test(h) && h.endsWith('.pdf')
  },
  {
    id: 'xsds',
    kind: 'xsd-zip',
    audience: 'common',
    test: h => h.endsWith('.zip') && /xsd|version/i.test(h)
  },
  {
    id: 'classification-combinations',
    kind: 'xlsx',
    audience: 'common',
    test: h => h.endsWith('.xlsx')
  }
];

function decodeHref(raw: string): string {
  return raw.replace(/&amp;/g, '&');
}

function absolute(href: string): string {
  if (href.startsWith('http')) return href;
  return AADE_ORIGIN + (href.startsWith('/') ? href : '/' + href);
}

/**
 * The index page lists the current release first, then a "Παλαιότερες
 * εκδόσεις" (older versions) list. Only hrefs above that marker belong to the
 * current release, so the page is truncated there before scanning.
 */
function currentReleaseSection(html: string): string {
  const marker = html.search(/Παλαιότερες\s+εκδόσεις/);
  return marker === -1 ? html : html.slice(0, marker);
}

export function parseVersion(html: string): string {
  const patterns = [
    /Νέα\s+έκδοση\s+v?([\d]+\.[\d]+\.[\d]+)/,
    /Έκδοση\s+v?([\d]+\.[\d]+\.[\d]+)/,
    /v([\d]+\.[\d]+\.[\d]+)\s+XSDs/
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  throw new Error('Could not determine the current version from the index page');
}

export function parseAssets(html: string): SpecAsset[] {
  const section = currentReleaseSection(html);
  const hrefs = new Set<string>();
  const re = /href="([^"]+\.(?:pdf|zip|xlsx))"/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section)) !== null) hrefs.add(decodeHref(m[1]));

  const found: SpecAsset[] = [];
  for (const matcher of ASSET_MATCHERS) {
    // Decoded so matchers can use readable substrings instead of %20 noise.
    const hit = [...hrefs].find(h => matcher.test(decodeURIComponent(h)));
    if (hit) {
      found.push({
        id: matcher.id,
        kind: matcher.kind,
        audience: matcher.audience,
        url: absolute(hit)
      });
    }
  }
  return found;
}

export async function discoverRelease(
  indexUrl: string = VERSION_INDEX_URL
): Promise<SpecRelease> {
  const res = await fetch(indexUrl);
  if (!res.ok) {
    throw new Error(`Version index returned HTTP ${res.status}`);
  }
  const html = await res.text();
  const assets = parseAssets(html);
  if (assets.length === 0) {
    throw new Error('No downloadable assets found on the version index page');
  }
  return { version: parseVersion(html), sourcePage: indexUrl, assets };
}

function extensionFor(asset: SpecAsset): string {
  if (asset.kind === 'pdf') return '.pdf';
  if (asset.kind === 'xsd-zip') return '.zip';
  return '.xlsx';
}

export async function fetchRelease(
  release: SpecRelease,
  specRoot: string
): Promise<Manifest> {
  const dir = path.join(specRoot, `v${release.version}`);
  await mkdir(dir, { recursive: true });

  const fetched: FetchedAsset[] = [];
  for (const asset of release.assets) {
    const res = await fetch(asset.url);
    if (!res.ok) {
      throw new Error(`${asset.id}: HTTP ${res.status} for ${asset.url}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const filePath = path.join(dir, asset.id + extensionFor(asset));
    await writeFile(filePath, buf);
    fetched.push({
      ...asset,
      path: path.relative(specRoot, filePath),
      sha256: createHash('sha256').update(buf).digest('hex'),
      bytes: buf.byteLength
    });
    console.log(`  fetched ${asset.id} (${(buf.byteLength / 1024).toFixed(0)} KB)`);
  }

  const manifest: Manifest = {
    version: release.version,
    sourcePage: release.sourcePage,
    fetchedAt: new Date().toISOString(),
    assets: fetched
  };
  await writeFile(
    path.join(dir, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n'
  );
  return manifest;
}
