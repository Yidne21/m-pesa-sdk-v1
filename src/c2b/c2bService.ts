import axios, { AxiosInstance } from "axios";
import { RegisterUrl, PaymentRequest, PaymentResponse } from "./c2bTypes";
import { RegisterUrlSchema, PaymentRequestSchema } from "./c2bSchema";
import { validate } from "../utils/validate";
import { ENDPOINTS, getBaseUrl } from "../utils/httpClient";
import { logger } from "../utils/logger";

export class C2b {
  private client: AxiosInstance;
  private apiKey: string;
  private log: ReturnType<typeof logger>;

  constructor(apiKey: string, environment: "sandbox" | "production") {
    this.apiKey = apiKey; // Allow passing the API key dynamically.
    this.client = axios.create({
      baseURL: getBaseUrl(environment),
    });
    this.log = logger({ apiKey, environment });
  }

  async registerUrl(data: RegisterUrl): Promise<any> {
    validate(data, RegisterUrlSchema);
    this.log.info("Registering URL", { data });
    try {
      const response = await this.client.post(
        `${ENDPOINTS.c2b.registerUrl}?apikey=${this.apiKey}`,
        data
      );
      this.log.info("URL registered successfully", { response: response.data });
      return response.data;
    } catch (error: any) {
      this.log.error("Error registering URL", {
        error: error.response?.data || error.message,
      });
      throw new Error(error.response?.data || "Request failed");
    }
  }

  async makePayment(data: PaymentRequest): Promise<PaymentResponse> {
    validate(data, PaymentRequestSchema);
    this.log.info("Making payment", { data });
    try {
      const response = await this.client.post(
        `${ENDPOINTS.c2b.makePayment}?apikey=${this.apiKey}`,
        data
      );
      this.log.info("Payment made successfully", { response: response.data });
      return response.data;
    } catch (error: any) {
      this.log.error("Error making payment", {
        error: error.response?.data || error.message,
      });
      throw new Error(error.response?.data || "Payment request failed");
    }
  }
}
