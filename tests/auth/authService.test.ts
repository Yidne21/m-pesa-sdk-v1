import { Auth } from "../../src/auth/authService";
import * as dotenv from "dotenv";
dotenv.config();

describe("Auth Service", () => {
  test("Should return a token", async () => {
    const auth = new Auth(
      process.env.CONSUMER_KEY!,
      process.env.CONSUMER_SECRET!
    );
    const token = await auth.getToken();
    expect(token).toBeDefined();
  });
});
