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
    MerchantRequestID: "SFC-Testing-9146-4216-9455-e3947ac570fc",
    BusinessShortCode: "554433",
    TransactionType: "CustomerPayBillOnline",
    Amount: 1,
    PartyA: 600983,
    PartyB: 600000,
    PhoneNumber: 251700404789,
    TransactionDesc: "Monthly Unlimited Package via Chatbot",
    CallBackURL:
      "https://apigee-listener.oat.mpesa.safaricomet.net/api/ussd-push/result",
    AccountReference: "DATA",
    ReferenceData: [
      {
        Key: "BundleName",
        Value: "Monthly Unlimited Bundle",
      },
      {
        Key: "BundleType",
        Value: "Self",
      },
      {
        Key: "TINNumber",
        Value: "89234093223",
      },
    ],
  });

  expect(response).toHaveProperty("MerchantRequestID");
  expect(response).toHaveProperty("ResponseDescription");
  expect(response.ResponseDescription).toBe(
    "Success. Request accepted for processing"
  );
});

test("B2C Payment Request", async () => {
  const auth = new Auth(
    process.env.CONSUMER_KEY!,
    process.env.CONSUMER_SECRET!
  );
  const token = await auth.getToken();

  const payment = new Payment(token);

  const b2cRequest = {
    InitiatorName: "testapi",
    SecurityCredential: "Safaricom111!",
    CommandID: "BusinessPayment",
    Occassion: "Disbursement",
    Amount: 12,
    PartyA: "101010",
    PartyB: "251700100100",
    Remarks: "Test B2C",
    QueueTimeOutURL: "https://mydomain.com/b2c/timeout",
    ResultURL: "https://mydomain.com/b2c/result",
  };

  const response = await payment.b2cPayment(b2cRequest);
  expect(response).toHaveProperty("ConversationID");
  expect(response.ResponseCode).toBe("0");
});
