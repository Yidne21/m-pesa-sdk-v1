# MPESA SDK

## Project Overview

The MPESA SDK provides a set of tools to interact with the MPESA API. It includes modules for authentication, B2C (Business to Customer) transactions, C2B (Customer to Business) transactions, error handling, and data validation. Designed with modularity and reliability in mind, it supports robust API interactions with retry mechanisms and input validation.

## Installation

To install the MPESA SDK, use the following command:

```bash
npm install mpesa-sdk-v1
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
const { Mpesa } = require("mpesa-sdk-v1");

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

## API Reference

### **Auth Module**

- `getToken()`: Returns an access token for API authentication.

### **B2C Module**

- `stkPush(data: StkPushRequest)`: Initiates an STK Push transaction.
- `payOut(data: PayOutRequest)`: Processes a B2C payout.

### **C2B Module**

- `registerUrl(data: RegisterUrl)`: Registers a URL for payment notifications.
- `makePayment(data: PaymentRequest)`: Initiates a payment from a customer to a business.

## Contributing

We welcome contributions to the MPESA SDK from authorized team members. To ensure a smooth collaboration process, please follow these guidelines:

### Prerequisites

Before contributing, ensure you:

1. Familiarize yourself with the SDK's core components and technical requirements.
2. Set up your development environment as described in the setup instructions.
3. Read the SDK documentation for a clear understanding of API interactions, error handling, and testing standards.

### Contribution Steps

1. **Create a New Branch**
   - Use a descriptive name for your branch (e.g., `git checkout -b add-new-feature`).
2. **Make Your Changes**
   - Follow the SDK's coding standards and conventions.
   - Ensure modularity by adhering to the SDK’s design principles.
3. **Test Your Changes**
   - Use the provided testing utilities to validate your changes.
   - Ensure 100% test coverage for the new functionality.
   - Run integration tests to verify compatibility with existing modules.
4. **Commit Your Changes**
   - Write clear and concise commit messages.
   - Avoid committing sensitive data, such as API keys.
5. **Push Your Changes**
   - Push your changes to the appropriate branch within the organization’s repository.
6. **Open a Merge Request**
   - Provide a detailed description of your changes, including the problem addressed and the solution implemented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
