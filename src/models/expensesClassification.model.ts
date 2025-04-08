// TypeScript model for ExpensesClassificationsDoc based on expensesClassification-v1.0.10.xsd

import {
  AmountType,
  ExpensesClassificationCategoryType,
  ExpensesClassificationValueType,
  VatExemptionType,
  VatType
} from './simple-types.model';

/**
 * Root element for submitting expense classifications.
 * Χαρατηρισμοί Εξόδων Πρότυπων Παραστατικών ΑΑΔΕ
 */
export interface ExpensesClassificationsDoc {
  /** Array of expense classifications per invoice */
  expensesInvoiceClassification: InvoiceExpensesClassificationType[];
}

/**
 * Represents expense classification data for a single invoice.
 */
export interface InvoiceExpensesClassificationType {
  /** Unique Invoice Registration Number (MARK) */
  invoiceMark: number; // xs:long

  /** Unique Classification Registration Number. Filled by the service. */
  classificationMark?: number; // xs:long, Optional

  /** VAT Number of the entity the classification refers to (used by representatives/accountants). */
  entityVatNumber?: string; // xs:string, Optional

  /** Transaction Mode (1: Reject, 2: Deviation) OR detailed classifications. */
  transactionMode?: 1 | 2; // xs:int, Choice

  /** Detailed expense classifications per invoice line. */
  invoicesExpensesClassificationDetails?: InvoicesExpensesClassificationDetailType[]; // Choice, Array (1..unbounded)

  /** Classification Submission Method (0 or 1). Used for postPerInvoice=true in ERP doc. */
  classificationPostMode?: 0 | 1; // xs:byte, Optional
}

/**
 * Represents expense classification details for a specific line number within an invoice.
 */
export interface InvoicesExpensesClassificationDetailType {
  /** The line number of the original invoice this classification refers to. */
  lineNumber: number; // xs:int

  /** List of expense classifications for this specific line. */
  expensesClassificationDetailData: ExpensesClassificationType[]; // Array (1..unbounded)
}

/**
 * Detailed expense classification data.
 * This type is defined here as it's the core element of this specific schema.
 */
export interface ExpensesClassificationType {
  /** Classification Code (E3 or VAT Code) */
  classificationType?: ExpensesClassificationValueType; // Optional
  /** Classification Category (E3) */
  classificationCategory?: ExpensesClassificationCategoryType; // Optional
  /** Amount of the classification */
  amount: AmountType; // Use AmountType from simple-types
  /** VAT Amount (only for VAT classifications) */
  vatAmount?: AmountType; // Optional
  /** VAT Category (only for VAT classifications) */
  vatCategory?: VatType; // Optional
  /** VAT Exemption Category (only for VAT classifications) */
  vatExemptionCategory?: VatExemptionType; // Optional
  /** Sequential ID for classifications within a line */
  id?: number; // xs:byte, Optional
}
