import { Payment } from "../src/services/payment";
import { Auth } from "../src/auth/auth";
import * as dotenv from "dotenv";
dotenv.config();

test("Initiates payment successfully", async () => {
  const auth = new Auth(
    process.env.CONSUMER_KEY!,
    process.env.CONSUMER_SECRET!
  );
  const token = await auth.getToken();

  const payment = new Payment(token);
  const response = await payment.stkPush({
    MerchantRequestID: "SFC-9146",
    BusinessShortCode: "174379",
    Password:
      "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",
    Timestamp: "20241226171227",
    TransactionType: "CustomerPayBillOnline",
    Amount: 5.0,
    PartyA: 600987,
    PhoneNumber: 254708374149,
    CallBackURL: "http://172.29.65.59:13345",
    AccountReference: "DATA",
    transactionDesc: "Payment for services",
    PartyB: 600000,
    TransactionDesc: "Payment",
    ReferenceData: [
      {
        Key: "BundleType",
        Value: "Self",
      },
    ],
  });

  expect(response).toHaveProperty("MerchantRequestID");
});
