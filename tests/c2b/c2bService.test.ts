import { C2b } from "../../src/c2b/c2bService";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("C2b Url Registration ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore(); // Restore axios to its original state after each test
  });

  it("should register URL successfully", async () => {
    const c2b = new C2b("testApiKey");

    const mockResponse = {
      header: {
        responseCode: 200,
        responseMessage: "Request processed successfully",
        customerMessage: "Request processed successfully",
        timestamp: "2024-02-12T02:20:31.390",
      },
    };

    mock
      .onPost(
        "https://apisandbox.safaricom.et/v1/c2b-register-url/register?apikey=testApiKey"
      )
      .reply(200, mockResponse);

    const response = await c2b.registerUrl({
      ShortCode: 101010,
      ResponseType: "Completed",
      CommandID: "RegisterURL",
      ConfirmationURL: "https://mydomain.com/c2b/confirmation",
      ValidationURL: "https://mydomai.com/c2b/validation",
    });

    expect(response).toHaveProperty("header");
    expect(response.header.responseMessage).toBe(
      "Request processed successfully"
    );
  });

  // it("should throw an error when API call fails", async () => {
  //   const c2b = new C2b("testApiKey");

  //   mock
  //     .onPost(
  //       "https://apisandbox.safaricom.et/v1/c2b-register-url/register?apikey=testApiKey"
  //     )
  //     .reply(400, { error: "Short Code already Registered" });

  //   await expect(
  //     c2b.registerUrl({
  //       ShortCode: 101010,
  //       ResponseType: "Completed",
  //       CommandID: "RegisterURL",
  //       ConfirmationURL: "https://mydomain.com/c2b/confirmation",
  //       ValidationURL: "https://mydomai.com/c2b/validation",
  //     })
  //   ).rejects.toThrow("Request failed");
  // });
});

describe("C2b Payments", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios); // Set up a new mock adapter before each test
  });

  afterEach(() => {
    mock.restore(); // Restore axios to its original state after each test
  });

  it("should make a payment successfully", async () => {
    const c2b = new C2b("testApiKey");

    const mockResponse = {
      RequestRefID: "29900fe1-ac90-45ce-9443-19eec5f31234",
      ResponseCode: "0",
      ResponseDesc: "The service request is processed successfully.",
      TransactionID: "ABC123456",
      AdditionalInfo: [],
    };

    mock
      .onPost(
        "https://apisandbox.safaricom.et/v1/c2b/payments?apikey=testApiKey"
      )
      .reply(200, mockResponse);

    const response = await c2b.makePayment({
      RequestRefID: "12345",
      CommandID: "CustomerPayBillOnline",
      Remark: "Here is a remark",
      ChannelSessionID: "10100000037656400042",
      SourceSystem: "USSD",
      Timestamp: "2014-09-30T11:03:19.111+03:00",
      Parameters: [
        { Key: "Amount", Value: "500" },
        { Key: "AccountReference", Value: "TU781RE" },
        { Key: "Currency", Value: "ETB" },
      ],
      ReferenceData: [{ Key: "AppVersion", Value: "v0.2" }],
      Initiator: {
        IdentifierType: 1,
        Identifier: "251799100026",
        SecurityCredential: "testSecurityCredential",
        SecretKey: "testSecretKey",
      },
      PrimaryParty: {
        IdentifierType: 1,
        Identifier: "251799100026",
      },
      ReceiverParty: {
        IdentifierType: 4,
        Identifier: "370360",
        ShortCode: "370360",
      },
    });

    expect(response).toHaveProperty("ResponseCode", "0");
    expect(response).toHaveProperty(
      "ResponseDesc",
      "The service request is processed successfully."
    );
  });

  // it("should throw an error when payment fails", async () => {
  //   const c2b = new C2b("testApiKey");

  //   mock
  //     .onPost(
  //       "https://apisandbox.safaricom.et/v1/c2b/payments?apikey=testApiKey"
  //     )
  //     .reply(400, {
  //       RequestRefID: "17b0ca4b-e721-4e54-9e17-315d3f968c78",
  //       ResponseCode: "2001",
  //       ResponseDesc: "The initiator information is invalid.",
  //       TransactionID: null,
  //       AdditionalInfo: [],
  //     });

  //   await expect(
  //     c2b.makePayment({
  //       RequestRefID: "12345",
  //       CommandID: "CustomerPayBillOnline",
  //       Remark: "Here is a remark",
  //       ChannelSessionID: "10100000037656400042",
  //       SourceSystem: "USSD",
  //       Timestamp: "2014-09-30T11:03:19.111+03:00",
  //       Parameters: [
  //         { Key: "Amount", Value: "500" },
  //         { Key: "AccountReference", Value: "TU781RE" },
  //         { Key: "Currency", Value: "ETB" },
  //       ],
  //       ReferenceData: [{ Key: "AppVersion", Value: "v0.2" }],
  //       Initiator: {
  //         IdentifierType: 1,
  //         Identifier: "251799100026",
  //         SecurityCredential: "testSecurityCredential",
  //         SecretKey: "testSecretKey",
  //       },
  //       PrimaryParty: {
  //         IdentifierType: 1,
  //         Identifier: "251799100026",
  //       },
  //       ReceiverParty: {
  //         IdentifierType: 4,
  //         Identifier: "370360",
  //         ShortCode: "370360",
  //       },
  //     })
  //   ).rejects.toThrow("Payment request failed");
  // });
});
