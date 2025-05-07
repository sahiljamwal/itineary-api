import { NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/base.error";
import logger from "../utils/logger.util";
import { EC } from "../constants/errors";
import { ErrorName } from "../constants/enums";

export const errorHandler = async (
  error: BaseError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  logger.error({ error, message: error.message, stack: error.stack });

  const statusCode = error.httpStatusCode || 500;
  const detail = error.isOperational
    ? error.message ?? EC.ERROR_IN_API
    : EC.ERROR_IN_API;
  const internalStatusCode = error.internalStatusCode || statusCode;
  const title = error.name ?? ErrorName.SYSTEM_ERROR;

  return response
    .status(statusCode)
    .send({ error: { detail, title, code: internalStatusCode } });
};
