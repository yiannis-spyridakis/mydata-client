// TypeScript model for ResponseDoc based on response-v1.0.10.xsd

/**
 * The main response document returned from myDATA API calls
 */
export interface ResponseDoc {
  ResponseDoc: {
    response: ResponseType | ResponseType[];
  };
}

/**
 * Response type for individual responses in a ResponseDoc
 */
export interface ResponseType {
  /** Line sequence number of the entity */
  index?: number;
  /** Entity identifier */
  invoiceUid?: string;
  /** Unique Invoice Registration Number (MARK) */
  invoiceMark?: number;
  /** QR Code URL */
  qrUrl?: string;
  /** Unique Classification Registration Number */
  classificationMark?: number;
  /** Unique Cancellation Number */
  cancellationMark?: number;
  /** Unique Payment Method Registration Number */
  paymentMethodMark?: number;
  /** Provider Authentication String */
  authenticationCode?: string;
  /** Recipient Providers */
  receptionProviders?: ReceptionProvidersType;
  /** Reception Emails */
  receptionEmails?: ReceptionEmailsType;
  /** List of Errors (appears when there are errors) */
  errors?: ErrorsType;
  /** Result code */
  statusCode: string;
}

/**
 * Error information
 */
export interface ErrorType {
  /** Error Message */
  message: string;
  /** Error Code */
  code: string;
}

/**
 * Collection of errors
 */
export interface ErrorsType {
  error: ErrorType[];
}

/**
 * Information about recipients' providers
 */
export interface ReceptionProvidersType {
  // XSD allows 0..unbounded, TS should reflect optional array
  ProviderInfo?: ProviderInfoType[];
}

/**
 * Provider information
 */
export interface ProviderInfoType {
  // XSD allows 0..unbounded for sequence, but likely only one VAT per info
  VATNumber: string;
}

/**
 * Collection of reception emails
 */
export interface ReceptionEmailsType {
  // XSD allows 0..unbounded
  email?: string[];
}
