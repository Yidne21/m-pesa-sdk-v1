export interface Data {
  Key: string;
  Value: string;
}

export type RegisterUrl = {
  ShortCode: number;
  ResponseType: string;
  CommandID: string;
  ConfirmationURL: string;
  ValidationURL: string;
};

export type PaymentRequest = {
  RequestRefID: string;
  CommandID: string;
  Remark: string;
  ChannelSessionID: string;
  SourceSystem: string;
  Timestamp: string;
  Parameters: Data[];
  ReferenceData: Data[];
  Initiator: {
    IdentifierType: number;
    Identifier: string;
    SecurityCredential: string;
    SecretKey: string;
  };
  PrimaryParty: {
    IdentifierType: number;
    Identifier: string;
  };
  ReceiverParty: {
    IdentifierType: number;
    Identifier: string;
    ShortCode: string;
  };
};

export type PaymentResponse = {
  RequestRefID: string;
  ResponseCode: string;
  ResponseDesc: string;
  TransactionID: string | null;
  AdditionalInfo: any[];
};
