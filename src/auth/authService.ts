import axios from "axios";

export class Auth {
  private consumerKey: string;
  private consumerSecret: string;
  private token: string | null;

  constructor(consumerKey: string, consumerSecret: string) {
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.token = null;

    console.log("+++++++++CK++++++++++:", this.consumerKey);
    console.log("+++++++++CS++++++++++:", this.consumerSecret);
  }

  async getToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.consumerKey}:${this.consumerSecret}`
    ).toString("base64");
    const response = await axios.get(
      "https://apisandbox.safaricom.et/v1/token/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    console.log("+++++++++Token++++++++++:", response.data);
    this.token = response.data.access_token;
    return this.token;
  }
}
