import { Auth } from "./auth/authService";
import { C2b } from "./c2b/c2bService";
import { B2c } from "./b2c/b2cService";

interface SDKConfig {
  clientId?: string;
  clientSecret?: string;
  apiKey?: string;
  consumerKey?: string;
  consumerSecret: string;
}

export class Mpesa {
  public c2bService: C2b;
  public b2cService?: B2c;
  public authService: Auth;

  constructor(config: SDKConfig) {
    // if (!config.clientId || !config.clientSecret) {
    //   throw new Error("Both clientId and clientSecret are required.");
    // }
    this.authService = new Auth(config.consumerKey, config.consumerSecret);
    this.c2bService = new C2b(config.apiKey || "");
    this.initializeB2cService();
  }

  public async initializeB2cService() {
    try {
      const token = await this.authService.getToken(); // Wait for the token
      console.log(
        "---------------------------b2c access token--------------------------",
        token
      );
      this.b2cService = new B2c(token); // Pass the token to B2c
    } catch (error) {
      console.error("Failed to get token:", error);
    }
  }
}
