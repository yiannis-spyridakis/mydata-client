// TypeScript model for IncomeClassificationsDoc based on incomeClassification-v1.0.10.xsd

import {
  AmountType,
  IncomeClassificationCategoryType,
  IncomeClassificationValueType
} from './simple-types.model';

/**
 * Root element for submitting income classifications.
 * Χαρατηρισμοί Εσόδων Πρότυπων Παραστατικών ΑΑΔΕ
 */
export interface IncomeClassificationsDoc {
  /** Array of income classifications per invoice */
  incomeInvoiceClassification: InvoiceIncomeClassificationType[];
}

/**
 * Represents income classification data for a single invoice.
 */
export interface InvoiceIncomeClassificationType {
  /** Unique Invoice Registration Number (MARK) */
  invoiceMark: number; // xs:long

  /** Unique Classification Registration Number. Filled by the service. */
  classificationMark?: number; // xs:long, Optional

  /** VAT Number of the entity the classification refers to (used by representatives/accountants). */
  entityVatNumber?: string; // xs:string, Optional

  /** Transaction Mode (1: Reject, 2: Deviation) OR detailed classifications. */
  transactionMode?: 1 | 2; // xs:int, Choice

  /** Detailed income classifications per invoice line. */
  invoicesIncomeClassificationDetails?: InvoicesIncomeClassificationDetailType[]; // Choice, Array (1..unbounded)
}

/**
 * Represents income classification details for a specific line number within an invoice.
 */
export interface InvoicesIncomeClassificationDetailType {
  /** The line number of the original invoice this classification refers to. */
  lineNumber: number; // xs:int

  /** List of income classifications for this specific line. */
  incomeClassificationDetailData: IncomeClassificationType[]; // Array (1..unbounded)
}

/**
 * Detailed income classification data.
 * This type is defined here as it's the core element of this specific schema.
 */
export interface IncomeClassificationType {
  /** Classification Code (E3 Code) */
  classificationType?: IncomeClassificationValueType; // Optional
  /** Classification Category */
  classificationCategory: IncomeClassificationCategoryType;
  /** Amount of the classification */
  amount: AmountType; // Use AmountType from simple-types
  /** Sequential ID for classifications within a line */
  id?: number; // xs:byte, Optional
}
