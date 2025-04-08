// TypeScript model for RequestedDoc based on requestedInvoicesDoc-v1.0.10.xsd

// Import complex types defined in other files
import { AadeBookInvoiceType } from './invoice.model';
import { InvoiceIncomeClassificationType } from './incomeClassification.model';
import { InvoiceExpensesClassificationType } from './expensesClassification.model';
import { PaymentMethodType } from './paymentMethods.model'; // Import the main type
import { ContinuationTokenType } from './simple-types.model';

/**
 * Root element for the response of RequestDocs and RequestTransmittedDocs methods.
 */
export interface RequestedDoc {
  /** Token for retrieving results in parts (pagination). */
  continuationToken?: ContinuationTokenType; // Optional

  /** List of retrieved invoices. */
  invoicesDoc?: {
    invoice?: AadeBookInvoiceType[]; // Optional Array (0..unbounded)
  }; // Optional

  /** List of retrieved cancelled invoices information. */
  cancelledInvoicesDoc?: {
    cancelledInvoice?: CancelledInvoiceType[]; // Optional Array (0..unbounded)
  }; // Optional

  /** List of retrieved income classifications. */
  incomeClassificationsDoc?: {
    incomeInvoiceClassification?: InvoiceIncomeClassificationType[]; // Optional Array (0..unbounded)
  }; // Optional

  /** List of retrieved expense classifications. */
  expensesClassificationsDoc?: {
    expensesInvoiceClassification?: InvoiceExpensesClassificationType[]; // Optional Array (0..unbounded)
  }; // Optional

  /** List of retrieved payment methods. */
  paymentMethodsDoc?: {
    /** NOTE: XSD uses <paymentMethods> wrapper with PaymentMethodType inside. */
    paymentMethods?: PaymentMethodType[]; // Optional Array (0..unbounded)
  }; // Optional
}

/**
 * Information about a cancelled invoice.
 */
export interface CancelledInvoiceType {
  /** MARK of the cancelled invoice */
  invoiceMark: number; // xs:long
  /** MARK of the cancellation record */
  cancellationMark: number; // xs:long
  /** Date of the cancellation */
  cancellationDate: Date; // xs:date
}
