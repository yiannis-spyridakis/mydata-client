// TypeScript model for RequestedE3Info based on RequestE3InfoResponse-v1.0.10.xml

import { ContinuationTokenType } from './simple-types.model';

/**
 * Root element for the response of the RequestE3Info method.
 */
export interface RequestedE3Info {
  /** Token for retrieving results in parts (pagination). */
  continuationToken?: ContinuationTokenType; // Optional

  /** List of E3 information records (per invoice or per day). */
  E3Info?: InvoiceE3DetailType[]; // Optional Array (0..unbounded)
}

/**
 * Detailed E3 information for a specific invoice or aggregated per day.
 */
export interface InvoiceE3DetailType {
  /** VAT Number of the entity. */
  V_Afm?: string; // xs:string, Optional
  /** The MARK of the invoice (present if not grouped per day). */
  V_Mark?: string; // xs:string, Optional
  /** Book type (Income/Expense). */
  vBook?: string; // xs:string, Optional
  /** Indicates if the related invoice is cancelled. */
  IsCancelled?: boolean; // xs:boolean, Optional
  /** Invoice issue date (or the date if grouped per day). */
  IssueDate: Date; // xs:dateTime
  /** E3 Classification Category. */
  V_Class_Category?: string; // xs:string, Optional
  /** E3 Classification Type (Code). */
  V_Class_Type?: string; // xs:string, Optional
  /** Value associated with the E3 classification. */
  V_Class_Value?: number; // xs:decimal, Optional
}
