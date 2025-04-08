// TypeScript model for RequestedProviderDoc based on RequestedProviderDoc-v1.0.10.xml

import { ContinuationTokenType } from './simple-types.model';

/**
 * Root element for the response of the RequestTransmittedDocs method for providers.
 * Παραστατικά από Πάροχο
 */
export interface RequestedProviderDoc {
  /** Token for retrieving results in parts (pagination). */
  continuationToken?: ContinuationTokenType; // Optional

  /** List of transmitted invoice summaries. */
  InvoiceProviderType?: InvoiceProviderType[]; // Optional Array (0..unbounded)
}

/**
 * Summary information for an invoice transmitted by a provider.
 */
export interface InvoiceProviderType {
  /** VAT Number of the Issuer */
  issuerVAT: string; // xs:string

  /** Unique Registration Number (MARK) assigned to the invoice */
  invoiceProviderMark: number; // xs:long

  /** Invoice Identifier (UID) */
  invoiceUid: string; // xs:string

  /** Provider Authentication String for the invoice */
  authenticationCode: string; // xs:string
}
