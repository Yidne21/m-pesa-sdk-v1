export interface Data {
  Key: string;
  Value: string;
}

export interface PaymentRequest {
  PhoneNumber: number;
  AccountReference: string;
  MerchantRequestID: string;
  BusinessShortCode: string;
  TransactionType: string;
  Amount: number;
  PartyA: number;
  PartyB: number;
  TransactionDesc: string;
  CallBackURL: string;
  ReferenceData: Data[];
  Password?: string;
  Timestamp?: string;
}

export interface B2CRequest {
  InitiatorName: string;
  SecurityCredential: string;
  CommandID: string;
  Amount: number;
  PartyA: string;
  PartyB: string;
  Remarks: string;
  QueueTimeOutURL: string;
  ResultURL: string;
  Occassion?: string;
}
