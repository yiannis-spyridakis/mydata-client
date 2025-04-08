// TypeScript model for RequestedBookInfo based on ERP documentation section 6.3
import {
  InvoiceType,
  InvoiceDetailType,
  ContinuationTokenType
} from './simple-types.model'; // Reuse simple types

/**
 * Root element for the response of RequestMyIncome and RequestMyExpenses methods.
 */
export interface RequestedBookInfo {
  /** Token for retrieving results in parts (pagination). */
  continuationToken?: ContinuationTokenType; // Optional

  /** List of aggregated book information entries. */
  bookInfo?: BookInfoType[]; // Array (0..unbounded)
}

/**
 * Aggregated information about income or expenses for a specific grouping.
 */
export interface BookInfoType {
  /** Counterparty VAT number (if applicable). */
  counterVatNumber?: string; // xs:string, Optional in XSD/Doc, but key for grouping
  /** Invoice Issue Date (or grouping date). */
  issueDate: Date; // xs:date
  /** Invoice Type. */
  invType: InvoiceType; // xs:string (maps to enum)
  /** Self-billing indicator. */
  selfPricing?: boolean; // xs:bool, Optional
  /** Invoice Detail Type (Marking). */
  invoiceDetailType?: InvoiceDetailType; // xs:int, Optional
  /** Aggregated Net value. */
  netValue?: number; // xs:double, Optional
  /** Aggregated VAT Amount. */
  vatAmount?: number; // xs:double, Optional
  /** Aggregated Withheld Tax Amount. */
  withheldAmount?: number; // xs:double, Optional
  /** Aggregated Other Taxes Amount. */
  otherTaxesAmount?: number; // xs:double, Optional
  /** Aggregated Stamp Duty Amount. */
  stampDutyAmount?: number; // xs:double, Optional
  /** Aggregated Fees Amount. */
  feesAmount?: number; // xs:double, Optional
  /** Aggregated Deductions Amount. */
  deductionsAmount?: number; // xs:double, Optional
  /** Aggregated Third Party Amount (from type 1.5). */
  thirdPartyAmount?: number; // xs:double, Optional
  /** Aggregated Total Gross Value. */
  grossValue?: number; // xs:double, Optional
  /** Count of invoices included in this aggregation. */
  count: number; // xs:int
  /** Minimum MARK of the invoices in this aggregation. */
  minMark?: string; // xs:string, Optional (Doc says string)
  /** Maximum MARK of the invoices in this aggregation. */
  maxMark?: string; // xs:string, Optional (Doc says string)
}
