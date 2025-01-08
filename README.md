# MPESA SDK

## Project Overview

The MPESA SDK provides a set of tools to interact with the MPESA API. It includes modules for authentication, B2C (Business to Customer) transactions, C2B (Customer to Business) transactions, error handling, and data validation. Designed with modularity and reliability in mind, it supports robust API interactions with retry mechanisms and input validation.

## Installation
To install the MPESA SDK, use the following command:

```bash
npm install mpesa-sdk-v1
```

## Configuration
To configure the SDK, you need to provide the necessary credentials and environment settings. Here is an example configuration:

```typescript
const config = {
  consumerKey: "your-consumer-key",
  consumerSecret: "your-consumer-secret",
  apiKey: "your-api-key",
  environment: "sandbox", // or "production"
  retry: true, // Enable retry mechanism
  retryCount: 2, // Number of retry attempts
};
```

## Usage Examples

### **1. Authentication**
Use the `Auth` module to obtain an access token:

```typescript
import { Auth } from "mpesa-sdk-v1";

const auth = new Auth("consumerKey", "consumerSecret", "sandbox");
const token = await auth.getToken();
console.log(token);
```

### **2. B2C Transactions**
Use the `B2c` module for Business-to-Customer transactions:

#### STK Push Example:
```typescript
import { B2c } from "mpesa-sdk-v1";

const b2c = new B2c(token, "sandbox");
await b2c.stkPush({
  BusinessShortCode: "123456",
  PassKey: "your-passkey",
  TransactionType: "CustomerPayBillOnline",
  Amount: 100,
  PartyA: "254700000000",
  PartyB: "123456",
  PhoneNumber: "254700000000",
  TransactionDesc: "Payment for services",
  CallBackURL: "https://example.com/callback",
});
```

#### PayOut Example:
```typescript
await b2c.payOut({
  InitiatorName: "TestUser",
  SecurityCredential: "password",
  CommandID: "BusinessPayment",
  Amount: 100,
  PartyA: "123456",
  PartyB: "254700000000",
  Remarks: "Payment Remarks",
  QueueTimeOutURL: "https://example.com/timeout",
  ResultURL: "https://example.com/result",
});
```

### **3. C2B Transactions**
Use the `C2b` module for Customer-to-Business transactions:

#### Register URL Example:
```typescript
import { C2b } from "mpesa-sdk-v1";

const c2b = new C2b("your-api-key", "sandbox");
await c2b.registerUrl({
  ShortCode: "123456",
  ResponseType: "Completed",
  ConfirmationURL: "https://example.com/confirm",
  ValidationURL: "https://example.com/validate",
});
```

#### Make Payment Example:
```typescript
await c2b.makePayment({
  ShortCode: "123456",
  CommandID: "CustomerPayBillOnline",
  Amount: 100,
  Msisdn: "254700000000",
  BillRefNumber: "INV123",
});
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

## Error Handling
The SDK includes utilities for managing errors. Here is an example of error handling:

```typescript
try {
  await b2c.stkPush(data);
} catch (error) {
  console.error("An error occurred:", error.message);
}
```

## Validation
Validation utilities ensure data integrity before API requests. Example:

```typescript
import { validate } from "mpesa-sdk-v1/utils/validate";

const isValid = validate(someData);
if (!isValid) {
  console.error("Validation failed");
}
```

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

