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
  Password: string;
  Timestamp: string;
  TransactionType: string;
  Amount: number;
  PartyA: number;
  PartyB: number;
  TransactionDesc: string;
  CallBackURL: string;
  ReferenceData: Data[];
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
    return response.data;
  }

  async b2cPayment(data: any): Promise<any> {
    const response = await this.client.post("b2c/v1/paymentrequest", data);
    return response.data;
  }
}
