import { DeliveryEventType } from './invoice.model';
import { InvoiceDeliveryStatusType } from './simple-types.model';

/**
 * Payload of the GetDeliveryNoteStatus XML root.
 *
 * `lifecycleHistory` intentionally accepts one event or an array because
 * xml2js collapses a single repeated XML element to an object.
 */
export interface DeliveryNoteStatus {
  invoiceMark: string;
  /** Numeric status code represented as xs:string by the AADE response. */
  status: `${InvoiceDeliveryStatusType}`;
  dispatchTimestamp: string;
  lifecycleHistory?: DeliveryEventType | DeliveryEventType[];
}

/** XML document returned by GetDeliveryNoteStatus. */
export interface GetDeliveryNoteStatusResponse {
  GetDeliveryNoteStatusResponse: DeliveryNoteStatus;
}