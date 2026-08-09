import { ResponseDoc } from './response.model';

export interface RegisterTransferRequest {
  invoiceMark: number;
  entityVatNumber: string;
  vehicleNumber: string;
  transportType: number;
  timeStamp?: Date | string;
  carrierVatNumber: string;
  pNumber?: string;
  location?: DeliveryLocation;
}

export interface DeliveryLocation {
  longitude: number;
  latitude: number;
}

export enum DeliveryOutcome {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  NONE = 'NONE'
}

export interface ConfirmDeliveryOutcomeRequest {
  qrUrl: string;
  outcome: DeliveryOutcome;
  deliveredWithoutRecipient?: boolean;
  deliveredPackaging?: DeliveredPackaging[];
}

export interface DeliveredPackaging {
  packagingType: number;
  quantity: number;
  otherPackagingTypeTitle?: string;
}

export interface RejectDeliveryNoteRequest {
  qrUrl?: string;
  invoiceMark?: number;
  rejectionReason?: string;
}

export type DeliveryNoteWriteResponse = ResponseDoc;