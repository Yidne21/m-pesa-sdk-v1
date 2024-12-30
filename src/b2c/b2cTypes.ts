export interface Data {
  Key: string;
  Value: string;
}

export interface StkPushRequest {
  PhoneNumber: number;
  AccountReference: string;
  MerchantRequestID: string;
  BusinessShortCode: number;
  PassKey: string;
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
  InitiatorPwd: string;
  CommandID: string;
  Amount: number;
  PartyA: number;
  PartyB: number;
  Remarks: string;
  QueueTimeOutURL: string;
  ResultURL: string;
  Occassion?: string;
  SecurityCredential?: string;
}

export interface PayOutResponse {
  ConversationID: string;
  OriginatorConversationID: string;
  ResponseCode: string;
  ResponseDescription: string;
}
