import { Auth } from "./auth/authService";
import { C2b } from "./c2b/c2bService";

interface SDKConfig {
  clientId: string;
  clientSecret: string;
  apiKey?: string;
}

export class Mpesa {
  public c2bService: C2b;

  constructor(config: SDKConfig) {
    if (!config.clientId || !config.clientSecret) {
      throw new Error("Both clientId and clientSecret are required.");
    }
    const authService = new Auth(config.clientId, config.clientSecret);

    this.c2bService = new C2b(config.apiKey || "");
  }
}
