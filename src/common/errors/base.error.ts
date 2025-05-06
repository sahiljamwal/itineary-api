export class BaseError extends Error {
  public httpStatusCode: number;
  public message: string;
  public isOperational: boolean;
  public internalStatusCode: number;

  constructor(
    name: string,
    httpStatusCode: number,
    message: string,
    internalStatusCode = httpStatusCode,
    isOperational = true
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    this.message = message;
    this.internalStatusCode = internalStatusCode;

    Error.captureStackTrace(this);
  }
}
