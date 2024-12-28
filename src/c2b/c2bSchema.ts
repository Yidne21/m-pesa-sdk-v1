import { z } from "zod";

export const RegisterUrlSchema = z.object({
  shortCode: z.string(),
  responseType: z.enum(["Completed", "Cancelled"]),
  confirmationURL: z.string().url(),
  validationURL: z.string().url(),
});

export const PaymentRequestSchema = z.object({
  shortCode: z.string(),
  commandID: z.string(),
  amount: z.number().positive(),
  msisdn: z.string(),
  billRefNumber: z.string().optional(),
});
