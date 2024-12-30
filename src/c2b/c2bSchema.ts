import { z } from "zod";

export const RegisterUrlSchema = z.object({
  ShortCode: z.string(),
  ResponseType: z.enum(["Completed", "Cancelled"]),
  ConfirmationURL: z.string().url(),
  ValidationURL: z.string().url(),
  CommandID: z.enum(["RegisterURL"]),
});

export const PaymentRequestSchema = z.object({
  // commandID: z.string(),
  // amount: z.number().positive(),
  // msisdn: z.string(),
  billRefNumber: z.string().optional(),
  RequestRefID: z.string(),
  CommandID: z.enum(["CustomerPayBillOnline"]),
  Remark: z.string(),
  ChannelSessionID: z.string(),
  SourceSystem: z.string(),
  Timestamp: z.string(),
  Parameters: z.array(
    z.object({
      Key: z.string(),
      Value: z.string(),
    })
  ),
  ReferenceData: z.array(
    z.object({
      Key: z.string(),
      Value: z.string(),
    })
  ),
  Initiator: z.object({
    IdentifierType: z.number(),
    Identifier: z.string(),
    SecurityCredential: z.string(),
    SecretKey: z.string(),
  }),
  PrimaryParty: z.object({
    IdentifierType: z.number(),
    Identifier: z.string(),
  }),
  ReceiverParty: z.object({
    IdentifierType: z.number(),
    Identifier: z.string(),
    ShortCode: z.string(),
  }),
});
