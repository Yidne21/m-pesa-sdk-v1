import axios, { AxiosInstance } from "axios";
import { RegisterUrl, PaymentRequest, PaymentResponse } from "./c2bTypes";
import { RegisterUrlSchema, PaymentRequestSchema } from "./c2bSchema";
import { validate } from "../utils/validate";
import { ENDPOINTS, getBaseUrl } from "../utils/httpClient";
import { logger } from "../utils/logger";
import { backOff } from "exponential-backoff";

export class C2b {
  private client: AxiosInstance;
  private apiKey: string;
  private log: ReturnType<typeof logger>;
  private retry: boolean;
  private retryCount: number;

  constructor(
    apiKey: string,
    environment: "sandbox" | "production",
    retry: boolean = true,
    retryCount: number = 2
  ) {
    this.apiKey = apiKey; // Allow passing the API key dynamically.
    this.client = axios.create({
      baseURL: getBaseUrl(environment),
    });
    this.log = logger({ apiKey, environment });
    this.retry = retry;
    this.retryCount = retryCount;
  }

  async registerUrl(data: RegisterUrl): Promise<any> {
    validate(data, RegisterUrlSchema);
    this.log.info("Registering URL", { data });
    try {
      const request = () =>
        this.client.post(
          `${ENDPOINTS.c2b.registerUrl}?apikey=${this.apiKey}`,
          data
        );
      const response = this.retry
        ? await backOff(request, { numOfAttempts: this.retryCount })
        : await request();
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
      const request = () =>
        this.client.post(
          `${ENDPOINTS.c2b.makePayment}?apikey=${this.apiKey}`,
          data
        );
      const response = this.retry
        ? await backOff(request, { numOfAttempts: this.retryCount })
        : await request();
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
