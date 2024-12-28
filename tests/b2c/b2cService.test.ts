import { B2cService } from "../../src/b2c/b2cService";
import { Auth } from "../../src/auth/authService";

describe("Bussiness to customer service test", () => {
  it("Initiates payment successfully", async () => {
    const auth = new Auth(
      process.env.CONSUMER_KEY!,
      process.env.CONSUMER_SECRET!
    );
    const token = await auth.getToken();

    const payment = new B2cService(token);
    const response = await payment.stkPush({
      MerchantRequestID: "SFC-Testing-9146-4216-9455-e3947ac570fc",
      BusinessShortCode: "554433",
      Password: "123",
      Timestamp: "20241226171227",
      TransactionType: "CustomerPayBillOnline",
      Amount: 5.0,
      PartyA: 600987,
      PartyB: 600000,
      PhoneNumber: 251700404789,
      TransactionDesc: "Payment",
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
  });

  it("it should request payout service successfuly", async () => {
    const payment = new B2cService("fake-token");

    const b2cRequest = {
      InitiatorName: "testapi",
      SecurityCredential:
        "iSHJEgQYt3xidNVJ7lbXZqRXUlBqpM/ytL5incRQISaAYX/daObQopdHWiSVXJvexSoYCt9mmb6+TiikmTrGZm5fbaT1BeuPKDF9NFpOLG3n3hUZE2s5wNJvFxD3sM62cBdCQulFquFBc0CwHpq/K2cU1MN8lahvYp+vHnmGODogMBDk8/5Q+5CuRRFNRIt50xM0r10kUHVeWgUa71H6oK2RqXnog4EPTnanMlswz7N3J8jeIKzgGUwnJA8va5CvuNWu2B2L1cAm9g6pGribcgFZ2sgzByJpRWBkfntjGgzsYXh+K3fPZmxWyTQi7TscSvujH1EaS7JxvCIWMM3K0Q==",
      CommandID: "BusinessPayment",
      Amount: 12,
      PartyA: "101010",
      PartyB: "251700100100",
      Remarks: "Test B2C",
      QueueTimeOutURL: "https://mydomain.com/b2c/timeout",
      ResultURL: "https://mydomain.com/b2c/result",
      Occassion: "Disbursement",
    };

    const response = await payment.payOut(b2cRequest);
    expect(response).toHaveProperty("ConversationID");
    expect(response.ResponseCode).toBe("0");
  });
});
