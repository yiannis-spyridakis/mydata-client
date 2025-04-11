export interface RequestDocParams {
  mark: number;
  entityVatNumber?: string;
  dateFrom?: Date; // dd-MM-yyyy
  dateTo?: Date; // dd-MM-yyyy
  counterVatNumber?: string;
  invType?: string;
  maxMark?: number;
  nextPartitionKey?: string;
  nextRowKey?: string;
}

export interface RequestMyDataParams {
  dateFrom: Date; // dd-MM-yyyy
  dateTo: Date; // dd-MM-yyyy
  entityVatNumber?: string;
  counterVatNumber?: string;
  invType?: string;
  nextPartitionKey?: string;
  nextRowKey?: string;
}

export interface RequestVatE3Params {
  dateFrom: Date; // dd-MM-yyyy
  dateTo: Date; // dd-MM-yyyy
  entityVatNumber?: string;
  GroupedPerDay?: 'true' | 'false';
  nextPartitionKey?: string;
  nextRowKey?: string;
}
