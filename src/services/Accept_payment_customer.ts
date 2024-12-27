import axios, { AxiosInstance } from "axios";

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

export class C2b {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey; // Allow passing the API key dynamically.
    this.client = axios.create({
      baseURL: "https://apisandbox.safaricom.et/v1/",
    });
  }

  async registerUrl(data: RegisterUrl): Promise<any> {
    try {
      const response = await this.client.post(
        `c2b-register-url/register?apikey=${this.apiKey}`,
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data || "Request failed");
    }
  }

  async makePayment(data: PaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await this.client.post(
        `c2b/payments?apikey=${this.apiKey}`,
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data || "Payment request failed");
    }
  }
}
