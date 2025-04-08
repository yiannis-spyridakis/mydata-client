// TypeScript model for ReceiverInfoDoc based on documentation (section 6.3)

// Import types defined in response.model.ts (which should contain these now)
import { ReceptionEmailsType, ReceptionProvidersType } from './response.model';

/**
 * Root element for the response of the RequestReceiverInfo method.
 * Contains information about an entity's registered providers and reception emails.
 */
export interface ReceiverInfoDoc {
  /** List of VAT numbers of the providers the entity uses. */
  receptionsProviders?: ReceptionProvidersType[]; // Array (0..unbounded), Optional

  /** List of emails the entity has declared for receiving electronic invoices. */
  receptionEmails?: ReceptionEmailsType[]; // Array (0..unbounded), Optional
}
