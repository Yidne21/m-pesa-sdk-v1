import axios, { AxiosInstance } from "axios";
import { RegisterUrl, PaymentRequest, PaymentResponse } from "./c2bTypes";
import { RegisterUrlSchema, PaymentRequestSchema } from "./c2bSchema";
import { validate } from "../utils/validate";
import { ENDPOINTS, getBaseUrl } from "../utils/httpClient";
import { logger } from "../utils/logger";
import { backOff } from "exponential-backoff";
import { errorHandler } from "../utils/errorHandler";

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
    this.log.info("Registering URL \n", { data });
    try {
      console.log(
        `${this.client.defaults.baseURL + ENDPOINTS.c2b.registerUrl}?apikey=${
          this.apiKey
        }`
      );

      const request = () =>
        this.client.post(
          `${ENDPOINTS.c2b.registerUrl}?apikey=${this.apiKey}`,
          data
        );
      const response = this.retry
        ? await backOff(request, { numOfAttempts: this.retryCount })
        : await request();
      this.log.info("URL registered successfully", { response: response.data });

      if (response.data.ResponseCode === 400) {
        throw new Error("Short Code already Registered");
      }
      return response.data;
    } catch (error: any) {
      this.log.error("Error registering URL", {
        error: error.response?.data || error.message,
      });

      errorHandler(error, { module: "C2B Payment" });
    }
  }

  async makePayment(data: PaymentRequest): Promise<PaymentResponse> {
    validate(data, PaymentRequestSchema);
    this.log.info("Making payment", { data });
    try {
      const request = () =>
        this.client.post(`${ENDPOINTS.c2b.makePayment}`, data);
      const response = this.retry
        ? await backOff(request, { numOfAttempts: this.retryCount })
        : await request();

      if (response.data.ResponseCode == "2001") {
        throw new Error("The initiator information is invalid.");
      }

      this.log.info("Payment made successfully", { response: response.data });
      return response.data;
    } catch (error: any) {
      this.log.error("Error making payment", {
        error: error.response?.data || error.message,
      });
      errorHandler(error, { module: "C2B Payment" });
    }
  }
}
