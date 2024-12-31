import { z } from "zod";

export const authConfigSchema = z.object({
  consumerKey: z.string({ required_error: "Consumer key is required" }),
  consumerSecret: z.string({ required_error: "Consumer secret is required" }),
  environment: z.enum(["sandbox", "production"]),
  retry: z.boolean().optional(),
  retryCount: z.number().optional(),
});
