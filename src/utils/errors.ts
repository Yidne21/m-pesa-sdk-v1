import { logger } from "./logger";

// Base API Error
export class APIError extends Error {
  code: string;
  status: number;
  context?: Record<string, any>;

  constructor(
    message: string,
    code: string,
    status: number,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = "APIError";
    this.code = code;
    this.status = status;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
    logger(context || {}).error(`API Error: ${message}`, {
      code,
      status,
      context,
    });
  }
}

// Specific API Errors
export class BadRequestError extends APIError {
  constructor(message = "Bad Request", context?: Record<string, any>) {
    super(message, "BAD_REQUEST", 400, context);
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = "Unauthorized", context?: Record<string, any>) {
    super(message, "UNAUTHORIZED", 401, context);
  }
}

export class ForbiddenError extends APIError {
  constructor(message = "Forbidden", context?: Record<string, any>) {
    super(message, "FORBIDDEN", 403, context);
  }
}

export class NotFoundError extends APIError {
  constructor(message = "Not Found", context?: Record<string, any>) {
    super(message, "NOT_FOUND", 404, context);
  }
}

// Validation Error for Missing/Invalid Parameters

export class ValidationError {
  message: string;
  fieldError: any;
  field: any;
  constructor(message?: string, fieldError?: any, field?: any) {
    this.message = message;
    this.fieldError = fieldError;
    this.field = field;

    logger({ Error: "Validation Error" }).error(message, {
      invalidFields: fieldError,
    });
  }
}

export class InternalServerError extends APIError {
  constructor(
    message = "Internal Server Error",
    context?: Record<string, any>
  ) {
    super(message, "INTERNAL_SERVER_ERROR", 500, context);
  }
}

export class ServiceUnavailableError extends APIError {
  constructor(message = "Service Unavailable", context?: Record<string, any>) {
    super(message, "SERVICE_UNAVAILABLE", 503, context);
  }
}
