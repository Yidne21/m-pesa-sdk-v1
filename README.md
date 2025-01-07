# MPESA SDK

## Project Overview
The MPESA SDK provides a set of tools to interact with the MPESA API. It includes modules for authentication, C2B (Customer to Business) transactions, B2C (Business to Customer) transactions, error handling, and data validation.

## Installation
To install the MPESA SDK, follow these steps:

```bash
# Clone the repository
git clone https://github.com/your-repo/mpesa-sdk.git

# Navigate to the project directory
cd mpesa-sdk

# Install dependencies
npm install
```

## Usage
Here's an example of how to use the MPESA SDK:

```typescript
import { Auth } from "./auth/authService";
import { C2b } from "./c2b/c2bService";
import { B2c } from "./b2c/b2cService";

// Initialize services
const auth = new Auth();
const c2b = new C2b();
const b2c = new B2c();

// Example usage
auth.authenticate();
c2b.initiateTransaction();
b2c.sendMoney();
```

## Configuration
To configure the SDK, you need to provide the necessary credentials. Here is an example configuration:

```typescript
interface SDKConfig {
  clientId?: string;
  clientSecret?: string;
}

// Example configuration
const config: SDKConfig = {
  clientId: "your-client-id",
  clientSecret: "your-client-secret"
};
```

## API Reference
### Auth
- `authenticate()`: Authenticates the user with the MPESA API.

### C2b
- `initiateTransaction()`: Initiates a C2B transaction.

### B2c
- `sendMoney()`: Sends money to a customer.

## Error Handling
The SDK includes an error handler to manage errors gracefully. Here's an example:

```typescript
import { errorHandler } from "./utils/errorHandler";

try {
  // Some code that may throw an error
} catch (error) {
  errorHandler(error);
}
```

## Validation
The SDK includes validation utilities to ensure data integrity. Here's an example:

```typescript
import { validate } from "./utils/validate";

// Example validation
const isValid = validate(someData);
if (!isValid) {
  console.error("Validation failed");
}
```

## Contributing
We welcome contributions to the MPESA SDK from authorized team members. To ensure a smooth collaboration process, please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
