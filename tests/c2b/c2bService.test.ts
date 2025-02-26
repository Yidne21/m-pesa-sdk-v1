import { Mpesa } from "../../index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ENDPOINTS, getBaseUrl } from "../../src/utils/httpClient";
import { logger } from "../../src/utils/logger";

describe("C2b Url Registration ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // mock = new MockAdapter(axios);
  });

  afterEach(() => {
    //mock.restore(); // Restore axios to its original state after each test
  });

  it("should register URL successfully with retry", async () => {
    const mpesa = new Mpesa({
      consumerKey: process.env.CONSUMER_KEY!,
      consumerSecret: process.env.CONSUMER_SECRET!,
      apiKey: "L4Y36QBxcBTOKEuJLXvCPJxA8sKV4frvYB2mOwbG2vdjalAX",
      environment: "sandbox",
      retry: true,
      retryCount: 2,
    });

    const c2b = mpesa.c2bService;

    const mockResponse = {
      header: {
        responseCode: 200,
        responseMessage: "Request processed successfully",
        customerMessage: "Request processed successfully",
        timestamp: "2024-02-12T02:20:31.390",
      },
    };

    // mock
    //   .onPost(
    //     `${getBaseUrl("sandbox")}${
    //       ENDPOINTS.c2b.registerUrl
    //     }?apikey=testApiKey2`
    //   )
    //   .reply(200, mockResponse);

    const response = await c2b.registerUrl({
      ShortCode: "802000",
      ResponseType: "Completed",
      CommandID: "RegisterURL",
      ConfirmationURL: "https://www.myservice:8080/confirmation",
      ValidationURL: "https://www.myservice:8080/validation",
    });

    expect(response.header.responseMessage).toBe(
      "Request processed successfully"
    );
  });

  it("should throw an error when API call fails", async () => {
    const mpesa = new Mpesa({
      consumerKey: process.env.CONSUMER_KEY!,
      consumerSecret: process.env.CONSUMER_SECRET!,
      apiKey: "L4Y36QBxcBTOKEuJLXvCPJxA8sKV4frvYB2mOwbG2vdjalAX",
      environment: "sandbox",
      retry: true,
      retryCount: 2,
    });

    const c2b = mpesa.c2bService;

    // mock
    //   .onPost(
    //     `${getBaseUrl("sandbox")}${
    //       ENDPOINTS.c2b.registerUrl
    //     }?apikey=testApiKey2`
    //   )
    //   .reply(400, { error: "Short Code already Registered" });

    await expect(
      c2b.registerUrl({
        ShortCode: "802000",
        ResponseType: "Completed",
        CommandID: "RegisterURL",
        ConfirmationURL: "https://www.myservice:8080/confirmation",
        ValidationURL: "https://www.myservice:8080/validation",
      })
    ).rejects.toThrow("Request failed with status code 400");
  });
});

describe("C2b Payments", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // mock = new MockAdapter(axios); // Set up a new mock adapter before each test
  });

  afterEach(() => {
    // mock.restore(); // Restore axios to its original state after each test
  });

  it("should make a payment successfully with retry", async () => {
    const mpesa = new Mpesa({
      clientId: "testClientId",
      clientSecret: "testClientSecret",
      apiKey: "testApiKey",
      environment: "sandbox",
      retry: true,
      retryCount: 2,
    });

    const c2b = mpesa.c2bService;

    const mockResponse = {
      RequestRefID: "29900fe1-ac90-45ce-9443-19eec5f31234",
      ResponseCode: "0",
      ResponseDesc: "The service request is processed successfully.",
      TransactionID: "ABC123456",
      AdditionalInfo: [],
    };

    // mock
    //   .onPost(`${getBaseUrl("sandbox")}${ENDPOINTS.c2b.makePayment}`)
    //   .reply(200, mockResponse);

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

  it("should throw an error when payment fails", async () => {
    const mpesa = new Mpesa({
      clientId: "testClientId",
      clientSecret: "testClientSecret",
      apiKey: "testApiKey",
      environment: "sandbox",
      retry: true,
      retryCount: 2,
    });

    const c2b = mpesa.c2bService;

    // mock
    //   .onPost(`${getBaseUrl("sandbox")}${ENDPOINTS.c2b.makePayment}`)
    //   .reply(400, {
    //     RequestRefID: "17b0ca4b-e721-4e54-9e17-315d3f968c78",
    //     ResponseCode: "2001",
    //     ResponseDesc: "The initiator information is invalid.",
    //     TransactionID: null,
    //     AdditionalInfo: [],
    //   });

    await expect(
      c2b.makePayment({
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
      })
    ).rejects.toThrow("Request failed with status code 404");
  });
});
