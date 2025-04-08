// TypeScript model for RequestedVatInfo based on RequestVatInfoResponse-v1.0.10.xml

import { ContinuationTokenType } from './simple-types.model';

/**
 * Root element for the response of the RequestVatInfo method.
 */
export interface RequestedVatInfo {
  /** Token for retrieving results in parts (pagination). */
  continuationToken?: ContinuationTokenType; // Optional

  /** List of VAT information records (per invoice or per day). */
  VatInfo?: InvoiceVatDetailType[]; // Optional Array (0..unbounded)
}

/**
 * Detailed VAT information for a specific invoice or aggregated per day.
 */
export interface InvoiceVatDetailType {
  /** The MARK of the invoice (present if not grouped per day). */
  Mark?: string; // xs:string, Optional
  /** Indicates if the invoice is cancelled. */
  IsCancelled?: boolean; // xs:boolean, Optional
  /** Invoice issue date (or the date if grouped per day). */
  IssueDate: Date; // xs:dateTime
  /** VAT amount corresponding to field 301. */
  Vat301?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 302. */
  Vat302?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 303. */
  Vat303?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 304. */
  Vat304?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 305. */
  Vat305?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 306. */
  Vat306?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 331. */
  Vat331?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 332. */
  Vat332?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 333. */
  Vat333?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 334. */
  Vat334?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 335. */
  Vat335?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 336. */
  Vat336?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 361. */
  Vat361?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 362. */
  Vat362?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 363. */
  Vat363?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 364. */
  Vat364?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 365. */
  Vat365?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 366. */
  Vat366?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 381. */
  Vat381?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 382. */
  Vat382?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 383. */
  Vat383?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 384. */
  Vat384?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 385. */
  Vat385?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 386. */
  Vat386?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 342. */
  Vat342?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 345. */
  Vat345?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 348. */
  Vat348?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 349. */
  Vat349?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 310. */
  Vat310?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 402. */
  Vat402?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 407. */
  Vat407?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 411. */
  Vat411?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 423. */
  Vat423?: number; // xs:decimal, Optional
  /** VAT amount corresponding to field 422. */
  Vat422?: number; // xs:decimal, Optional
  /** Unclassified VAT amount corresponding to field 361. */
  VatUnclassified361?: number; // xs:decimal, Optional
  /** Unclassified VAT amount corresponding to field 381. */
  VatUnclassified381?: number; // xs:decimal, Optional
}
