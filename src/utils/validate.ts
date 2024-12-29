import { type ZodSchema } from "zod";
import { ValidationError } from "./errors";

export const validate = <T>(field: unknown, schema: ZodSchema<T>) => {
  const result = schema.safeParse(field);
  if (result.success) {
    return { data: result.data };
  } else {
    const fieldError = result.error?.flatten().fieldErrors;
    const message = "Validation Error";
    throw new ValidationError(message, fieldError, field);
  }
};
