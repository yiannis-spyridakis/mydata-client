// TypeScript model for PaymentMethodsDoc based on paymentMethods-v1.0.10.xsd

import { AmountType, PaymentMethod } from './simple-types.model';
// Import complex types that remain in invoice.model.ts
import { ProviderSignatureType, ECRTokenType } from './invoice.model';

/**
 * Root element for submitting payment methods.
 * Μέθοδοι Πληρωμής
 */
export interface PaymentMethodsDoc {
  /**
   * Array of payment method information per invoice.
   * NOTE: XSD uses <paymentMethods> element with type PaymentMethodType,
   * but ERP doc diagram (4.2.4) shows <payment> element. Using 'payment' based on diagram.
   */
  payment: PaymentMethodType[]; // Changed from paymentMethods to payment
}

/**
 * Represents payment method information associated with a single invoice.
 */
export interface PaymentMethodType {
  /** Unique Invoice Registration Number (MARK) */
  invoiceMark: number; // xs:long

  /** Unique Payment Method Registration Number. Filled by the service. */
  paymentMethodMark?: number; // xs:long, Optional

  /** VAT Number of the entity the payment refers to (used by providers/representatives). */
  entityVatNumber?: string; // xs:string, Optional

  /** List of payment method details for the invoice. */
  paymentMethodDetails: PaymentMethodDetailType[]; // Array (1..unbounded)
}

/**
 * Detailed information about a single payment method used for an invoice.
 * This type is defined here as it's the core element of this specific schema.
 */
export interface PaymentMethodDetailType {
  /** Payment Type */
  type: PaymentMethod; // Use enum from simple-types
  /** Payment Amount */
  amount: AmountType; // Use AmountType from simple-types
  /** Additional information (e.g., Bank Account No.) */
  paymentMethodInfo?: string; // xs:string, Optional
  /** Tip amount */
  tipAmount?: AmountType; // Optional
  /** Transaction Identifier (e.g., POS transaction ID) */
  transactionId?: string; // xs:string, Optional (Valid only for type = 7)
  /** POS Terminal Identifier (tid) */
  tid?: string; // xs:string, Optional, Max Length 200
  /** Provider Payment Signature (for provider channel) */
  ProvidersSignature?: ProviderSignatureType; // Optional, Import from invoice.model
  /** Fiscal Device Payment Signature (for ERP channel) */
  ECRToken?: ECRTokenType; // Optional, Import from invoice.model
}
