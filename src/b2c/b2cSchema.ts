import { z } from "zod";

export const PayOutRequstSchema = z.object({
  InitiatorName: z.string().min(1, { message: "InitiatorName is required" }),
  InitiatorPwd: z.string(),
  CommandID: z.string(),
  Amount: z.number().positive({ message: "Amount must be a positive value" }),
  PartyA: z
    .number()
    .positive()
    .int()
    .refine((val) => val >= 10000 && val <= 999999, {
      message: "Invalid PartyB Short Code format. It should be 5 to 6 digits",
    }),
  PartyB: z
    .number()
    .positive()
    .refine((val) => /^2547\d{8}$/.test(val.toString()), {
      message:
        "Invalid phone number format. It should be 12 digits starting with 2547",
    }),
  Remarks: z
    .string()
    .max(100, { message: "Remarks cannot exceed 100 characters" }),
  QueueTimeOutURL: z
    .string()
    .url({
      message:
        "Invalid QueueTimeOutURL format. ex, https://ip%20or%20domain:port/path or domain:port/path",
    })
    .optional(),
  ResultURL: z.string().url({
    message: "Invalid ResultURL format. ex, https://mydomain.com/path",
  }),
  Occassion: z
    .string()
    .max(100, { message: "Occassion cannot exceed 100 characters" })
    .optional(),
});

export const StkPushRequestSchema = z.object({
  BusinessShortCode: z
    .number()
    .positive()
    .int()
    .refine((val) => val >= 10000 && val <= 999999, {
      message: "Invalid Business Short Code format. It should be 5 to 6 digits",
    }),
  TransactionType: z.enum(["CustomerPayBillOnline", "CustomerBuyGoodsOnline"], {
    errorMap: () => ({
      message:
        "Invalid TransactionType. Must be 'CustomerPayBillOnline' or 'CustomerBuyGoodsOnline'.",
    }),
  }),
  Amount: z
    .number()
    .positive({ message: "Amount must be a positive value greater than 0." }),
  PartyA: z
    .number()
    .positive()
    .refine((val) => /^2547\d{8}$/.test(val.toString()), {
      message:
        "Invalid phone number format. It should be 12 digits starting with 2547",
    }),
  PartyB: z
    .number()
    .positive()
    .int()
    .refine((val) => val >= 10000 && val <= 999999, {
      message: "Invalid PartyB Short Code format. It should be 5 to 6 digits",
    }),
  PhoneNumber: z
    .number()
    .positive()
    .refine((val) => /^2547\d{8}$/.test(val.toString()), {
      message:
        "Invalid phone number format. It should be 12 digits starting with 2547",
    }),
  CallBackURL: z.string().url({
    message: "Invalid CallBackURL format. ex, https://mydomain.com/path",
  }),
  AccountReference: z
    .string()
    .max(12, { message: "Account Reference cannot exceed 12 characters." })
    .regex(/^[a-zA-Z0-9]*$/, {
      message:
        "Account Reference must be alphanumeric (letters and numbers only).",
    })
    .optional(),
  TransactionDesc: z
    .string()
    .max(12, { message: "Transaction desc cannot exceed 13 characters." })
    .optional(),
});
