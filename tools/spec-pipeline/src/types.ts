export interface SpecAsset {
  /** Stable key used as the on-disk filename stem. */
  id: string;
  kind: 'pdf' | 'xsd-zip' | 'xlsx';
  url: string;
  /** Audience the document targets; xsd/xlsx bundles are 'common'. */
  audience: 'erp' | 'providers' | 'delivery-note' | 'common';
}

export interface SpecRelease {
  version: string;
  /** Page the assets were discovered on, for provenance. */
  sourcePage: string;
  assets: SpecAsset[];
}

export interface FetchedAsset extends SpecAsset {
  path: string;
  sha256: string;
  bytes: number;
}

export interface Manifest {
  version: string;
  sourcePage: string;
  fetchedAt: string;
  assets: FetchedAsset[];
}

export type Language = 'gr' | 'en';

/** A single row of a myDATA field-definition table. */
export interface FieldRow {
  field: string;
  type: string;
  required: string;
  description: string;
  values: string;
}

/** A code/description row from an appendix value-list table. */
export interface CodeRow {
  code: string;
  description: string;
}

export interface TableBlock {
  kind: 'field' | 'code';
  /** Nearest preceding heading, used to title the table. */
  heading: string;
  rows: FieldRow[] | CodeRow[];
}
