import axios, { AxiosInstance } from "axios";

export interface Data {
  Key: string;
  Value: string;
}

export interface PaymentRequest {
  PhoneNumber: number;
  AccountReference: string;
  // transactionDesc: string;
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

export class Payment {
  private client: AxiosInstance;

  constructor(token: string) {
    this.client = axios.create({
      baseURL: "https://apisandbox.safaricom.et/mpesa/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async stkPush(data: PaymentRequest): Promise<any> {
    console.log("+++++++++Data++++++++++:", data);
    const response = await this.client.post("stkpush/v3/processrequest", data);
    console.log("+++++++++Response++++++++++:", response.data);
    console.log("+++++++++Response++++++++++:", response.data);
    return response.data;
  }

  // B2C Payout Implementation
  async b2cPayment(request: B2CRequest): Promise<any> {
    try {
      const response = await this.client.post("b2c/v1/paymentrequest", request);
      console.log("B2C Payment Response:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "B2C Payment Error:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
