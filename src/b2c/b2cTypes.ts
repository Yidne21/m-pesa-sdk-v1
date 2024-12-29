export interface Data {
  Key: string;
  Value: string;
}

export interface StkPushRequest {
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

export interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export interface PayOutRequest {
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

export interface PayOutResponse {
  ConversationID: string;
  OriginatorConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
}
