import axios, { AxiosInstance } from "axios";
import {
  PayOutRequest,
  StkPushRequest,
  PayOutResponse,
  StkPushResponse,
} from "./b2cTypes";
import { errorHandler } from "../utils/errorHandler";
import { validate } from "../utils/validate";
import { ENDPOINTS, getBaseUrl } from "../utils/httpClient";
import { logger } from "../utils/logger";
import { backOff } from "exponential-backoff";
import { UnauthorizedError } from "../utils/errors";
import { StkPushRequestSchema, PayOutRequstSchema } from "./b2cSchema";
import { getFormattedTimestamp } from "../utils";

export class B2c {
  private client: AxiosInstance;
  private log: ReturnType<typeof logger>;
  private retry: boolean;
  private retryCount: number;

  constructor(
    token: string,
    environment: "sandbox" | "production",
    retry: boolean = true,
    retryCount: number = 2
  ) {
    this.client = axios.create({
      baseURL: getBaseUrl(environment),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.retry = retry;
    this.retryCount = retryCount;
    this.log = logger({ module: "B2C Service" });
  }

  async stkPush(data: StkPushRequest): Promise<StkPushResponse> {
    validate(data, StkPushRequestSchema);
    this.log.info("Initiating stkPush request");
    try {
      const timestamp = getFormattedTimestamp();
      const password = `${data.BusinessShortCode}${data.PassKey}${timestamp}`;
      const passwordBuffer = Buffer.from(password).toString("base64");
      data.Password = passwordBuffer;
      data.Timestamp = timestamp;
      const request = () => this.client.post(`${ENDPOINTS.b2c.stkPush}`, data);
      const response = this.retry
        ? await backOff(request, { numOfAttempts: this.retryCount })
        : await request();
      if (response.data.ResponseCode !== "0") {
        const { data } = response;
        const { ResponseCode, CustomerMessage } = data;
        if (ResponseCode === "SVC0403") {
          throw new UnauthorizedError(CustomerMessage, data);
        }
      }
      this.log.info("stkPush request processed successfully");

      return response.data;
    } catch (err) {
      errorHandler(err, { module: "B2C Payment" });
    }
  }

  // B2C Payout Implementation
  async payOut(data: PayOutRequest): Promise<PayOutResponse> {
    validate(data, PayOutRequstSchema);
    this.log.info("Initiating B2C pay out request");
    try {
      const SecurityCredential = Buffer.from(data.InitiatorPwd).toString(
        "base64"
      );
      data.SecurityCredential = SecurityCredential;
      const request = () => this.client.post(`${ENDPOINTS.b2c.payout}`, data);
      const response = this.retry
        ? await backOff(request, { numOfAttempts: this.retryCount })
        : await request();
      this.log.info("Pay out request processed successfully");
      return response.data;
    } catch (error) {
      errorHandler(error, { module: "B2C Payment" });
    }
  }
}
