import { Auth } from "./src/auth/authService";
import { C2b } from "./src/c2b/c2bService";
import { B2c } from "./src/b2c/b2cService";
import { errorHandler } from "./src/utils/errorHandler";
import { validate } from "./src/utils/validate";
import { authConfigSchema } from "./src/auth/authConfigSchema";

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
  }

  public async initializeB2cService() {
    validate(this.config, authConfigSchema);
    try {
      this.authService = new Auth(
        this.config.consumerKey,
        this.config.consumerSecret,
        this.config.environment,
        this.config.retry,
        this.config.retryCount
      );
      const token = await this.authService.getToken();
      this.b2cService = new B2c(
        token,
        this.config.environment,
        this.config.retry,
        this.config.retryCount
      );
    } catch (error) {
      console.log(error);

      errorHandler(error, { module: "Mpesa Service" });
    }
  }
}
