import { Mpesa } from "../../index";

describe("Bussiness to customer service test", () => {
  const config = {
    environment: "sandbox" as "sandbox",
    consumerKey: process.env.CONSUMER_KEY!,
    consumerSecret: process.env.CONSUMER_SECRET!,
  };
  const mpesa = new Mpesa(config);

  it("Initiates payment successfully", async () => {
    // Wait until b2cService is ready
    await mpesa.initializeB2cService();

    const response = await mpesa.b2cService?.stkPush({
      MerchantRequestID: "SFC-Testing-9146-4216-9455-e3947ac570fc",
      BusinessShortCode: 554433,
      PassKey: "123",
      TransactionType: "CustomerPayBillOnline",
      Amount: 5.0,
      PartyA: 251700404789,
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
    // Wait until b2cService is ready
    await mpesa.initializeB2cService();

    const b2cRequest = {
      InitiatorName: "testapi",
      InitiatorPwd: "Safaricom426!",
      CommandID: "BusinessPayment",
      Amount: 12,
      PartyA: 101010,
      PartyB: 251700100100,
      Remarks: "Test B2C",
      QueueTimeOutURL: "https://mydomain.com/b2c/timeout",
      ResultURL: "https://mydomain.com/b2c/result",
      Occassion: "Disbursement",
    };

    const response = await mpesa.b2cService?.payOut(b2cRequest);
    expect(response).toHaveProperty("ConversationID");
    expect(response?.ResponseCode).toBe("0");
  });
});
