import { ErrorName } from "../constants/enums";
import { BaseError } from "./base.error";

export class NotFoundError extends BaseError {
  constructor(message: string, internalStatusCode: number = 404) {
    super(ErrorName.NOT_FOUND_ERROR, 404, message, internalStatusCode);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string, internalStatusCode: number = 400) {
    super(ErrorName.VALIDATION_ERROR, 400, message, internalStatusCode);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string, internalStatusCode: number = 401) {
    super(ErrorName.AUTHENTICATION_ERROR, 401, message, internalStatusCode);
  }
}

export class AuthorizationError extends BaseError {
  constructor(message: string, internalStatusCode: number = 403) {
    super(ErrorName.AUTHORIZATION_ERROR, 403, message, internalStatusCode);
  }
}

export class SystemError extends BaseError {
  constructor(message: string, internalStatusCode: number = 500) {
    super(ErrorName.AUTHORIZATION_ERROR, 500, message, internalStatusCode);
  }
}
