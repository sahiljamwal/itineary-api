import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../common/errors/custom.error";
import { userAuthSchema } from "../helpers/joi-schema.helper";

export const validateUserRegisteration = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.body = await userAuthSchema["register"].validateAsync(
      request.body,
      {
        errors: { wrap: { label: "" } },
      }
    );

    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};

export const validateUserLogin = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.body = await userAuthSchema["login"].validateAsync(request.body, {
      errors: { wrap: { label: "" } },
    });

    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};
