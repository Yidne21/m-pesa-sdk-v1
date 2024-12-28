import axios, { AxiosInstance } from "axios";
import { RegisterUrl, PaymentRequest, PaymentResponse } from "./c2bTypes";

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
