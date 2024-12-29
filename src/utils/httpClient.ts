const BASE_URLS = {
  sandbox: "https://apisandbox.safaricom.et",
  production: "https://api.safaricom.et",
};

export const ENDPOINTS = {
  authentication: "/oauth/v1/generate",
  c2b: {
    registerUrl: "/v1/c2b-register-url/register",
    makePayment: "/v1/c2b/payments",
  },
  b2c: {
    stkPush: "/mpesa/stkpush/v3/processrequest",
    payout: "/mpesa/b2c/v1/paymentrequest",
  },
};

export const getBaseUrl = (environment: "sandbox" | "production") =>
  BASE_URLS[environment];
