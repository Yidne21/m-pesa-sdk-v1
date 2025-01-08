# Mpesa Node.js SDK

## Overview

This package provides a Node.js client for interacting with Mpesa's API services, enabling developers to integrate Mpesa payment solutions into their applications. The client supports both Business to Customer (B2C) and Customer to Business (C2B) transactions, as well as URL registration for callback responses.

## Installation

```bash
npm install mpesa-node-sdk
```

## Configuration

To initialize the Mpesa client, you need to provide the following configuration options:

- `consumerKey`: Your application's consumer key.
- `consumerSecret`: Your application's consumer secret.
- `environment`: Either `sandbox` or `production`.
- `apiKey` (optional): Required for C2B services.
- `retry` (optional): Enable automatic retries for failed requests.
- `retryCount` (optional): Number of retry attempts.

Example:

```javascript
const { Mpesa } = require("mpesa-node-client");

const mpesa = new Mpesa({
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  environment: "sandbox",
  apiKey: process.env.API_KEY,
  retry: true,
  retryCount: 2,
});
```

---

## Business to Customer (B2C) Transactions

### Initiating Payment

Use the `stkPush` method to initiate a payment request to a customer.

Example:

```javascript
await mpesa.initializeB2cService();

const response = await mpesa.b2cService.stkPush({
  MerchantRequestID: "SFC-Testing-9146-4216-9455-e3947ac570fc",
  BusinessShortCode: 554433,
  PassKey: "123",
  TransactionType: "CustomerPayBillOnline",
  Amount: 5.0,
  PartyA: 251700404789,
  PartyB: 600000,
  PhoneNumber: 251700404789,
  TransactionDesc: "Payment",
  CallBackURL: "https://example.com/callback",
  AccountReference: "DATA",
  ReferenceData: [
    { Key: "BundleName", Value: "Monthly Unlimited Bundle" },
    { Key: "BundleType", Value: "Self" },
    { Key: "TINNumber", Value: "89234093223" },
  ],
});

console.log(response);
```

### Payout Service

The `payOut` method is used to send funds from a business to a customer.

Example:

```javascript
await mpesa.initializeB2cService();

const response = await mpesa.b2cService.payOut({
  InitiatorName: "testapi",
  InitiatorPwd: "Safaricom426!",
  CommandID: "BusinessPayment",
  Amount: 12,
  PartyA: 101010,
  PartyB: 251700100100,
  Remarks: "Test B2C",
  QueueTimeOutURL: "https://example.com/timeout",
  ResultURL: "https://example.com/result",
  Occassion: "Disbursement",
});

console.log(response);
```

---

## Customer to Business (C2B) Transactions

### URL Registration

Register your callback URLs for receiving payment notifications.

Example:

```javascript
const response = await mpesa.c2bService.registerUrl({
  ShortCode: "802000",
  ResponseType: "Completed",
  CommandID: "RegisterURL",
  ConfirmationURL: "https://example.com/confirmation",
  ValidationURL: "https://example.com/validation",
});

console.log(response);
```

### Payment Initiation

To initiate C2B payments, use the `makePayment` method.

Example:

```javascript
const response = await mpesa.c2bService.makePayment({
  RequestRefID: "12345",
  CommandID: "CustomerPayBillOnline",
  Remark: "Payment for services",
  ChannelSessionID: "10100000037656400042",
  SourceSystem: "USSD",
  Timestamp: "2024-01-01T10:00:00Z",
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
  PrimaryParty: { IdentifierType: 1, Identifier: "251799100026" },
  ReceiverParty: {
    IdentifierType: 4,
    Identifier: "370360",
    ShortCode: "370360",
  },
});

console.log(response);
```

---

## Error Handling

The package throws errors when API calls fail. Use try-catch blocks to handle these errors.

Example:

```javascript
try {
  const response = await mpesa.c2bService.makePayment({
    /* params */
  });
} catch (error) {
  console.error("Error occurred:", error.message);
}
```

---

## License

MIT License.
