import { AxiosError } from "axios";
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  InternalServerError,
  ServiceUnavailableError,
} from "./errors";

export const errorHandler = (err: any, context: any) => {
  if (err instanceof AxiosError && err.response) {
    const { status, data } = err.response;
    const message = data?.errorMessage || err.message;

    switch (status) {
      case 400:
        throw new BadRequestError(message, { status, data });
      case 401:
        throw new UnauthorizedError(message, { status, data });
      case 403:
        throw new ForbiddenError(message, { status, data });
      case 404:
        throw new NotFoundError(message, { status, data });
      case 422:
        throw new ValidationError(message, data?.fieldError, data?.field);
      case 500:
        throw new InternalServerError(message, { status, data });
      case 503:
        throw new ServiceUnavailableError(message, { status, data });
      default:
        throw new InternalServerError("Unknown API Error", { status, data });
    }
  }

  throw new InternalServerError(err.message || "Unexpected Error", { err });
};
