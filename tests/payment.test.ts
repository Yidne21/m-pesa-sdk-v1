import { Payment } from "../src/services/payment";

test("Initiates payment successfully", async () => {
  const payment = new Payment("fake-token");
  const response = await payment.stkPush({
    amount: 500,
    phoneNumber: "251912345678",
    accountReference: "123456",
    transactionDesc: "Testing",
  });

  expect(response).toHaveProperty("MerchantRequestID");
});
