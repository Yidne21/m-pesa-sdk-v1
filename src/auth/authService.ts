import axios from "axios";
import { errorHandler } from "../utils/errorHandler";
import { ENDPOINTS, getBaseUrl } from "../utils/httpClient";
import { backOff } from "exponential-backoff";

export class Auth {
  private consumerKey: string;
  private consumerSecret: string;
  private token: string | null;
  private retry: boolean;
  private retryCount: number;
  private env: "sandbox" | "production";

  constructor(
    consumerKey: string,
    consumerSecret: string,
    environment: "sandbox" | "production",
    retry: boolean = true,
    retryCount: number = 2
  ) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.token = null;
    this.env = environment;
    this.retry = retry;
    this.retryCount = retryCount;
  }

  async getToken(): Promise<string> {
    try {
      const auth = Buffer.from(
        `${this.consumerKey}:${this.consumerSecret}`
      ).toString("base64");

      const request = () =>
        axios.get(`${getBaseUrl(this.env)}/${ENDPOINTS.auth}`, {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        });
      const response = this.retry
        ? await backOff(request, { numOfAttempts: this.retryCount })
        : await request();
      this.token = response.data.access_token;
      return this.token;
    } catch (err) {
      errorHandler(err, { module: "auth" });
    }
  }
}
