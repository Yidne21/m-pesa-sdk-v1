import axios, { AxiosInstance } from "axios";
import { B2CRequest, PaymentRequest } from "./b2cTypes";

export class B2cService {
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
  async payOut(request: B2CRequest): Promise<any> {
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
