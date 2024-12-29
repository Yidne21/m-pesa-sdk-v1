import { Auth } from "./auth/authService";
import { C2b } from "./c2b/c2bService";
import { B2c } from "./b2c/b2cService";
import { errorHandler } from "./utils/errorHandler";

interface SDKConfig {
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  environment: "sandbox" | "production";
  retry?: boolean;
  retryCount?: number;
  consumerKey?: string;
  consumerSecret?: string;
}

export class Mpesa {
  public c2bService: C2b;
  public b2cService?: B2c;
  public authService: Auth;
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.config = config;
    this.c2bService = new C2b(
      config.apiKey || "",
      config.environment,
      config.retry,
      config.retryCount
    );
    this.authService = new Auth(config.consumerKey, config.consumerSecret);
    this.initializeB2cService();
  }

  public async initializeB2cService() {
    try {
      const token = await this.authService.getToken();
      this.b2cService = new B2c(
        token,
        this.config.environment,
        this.config.retry,
        this.config.retryCount
      );
    } catch (error) {
      errorHandler(error, { module: "Mpesa Service" });
    }
  }
}
