import { NextFunction, Request, Response } from "express";
import {
  NotFoundError,
  ValidationError,
} from "../../common/errors/custom.error";
import { userAuthSchema } from "../helpers/joi-schema.helper";
import jwtUtil, { JwtPayload } from "../../common/utils/jwt.util";
import authService from "../services/auth.service";
import { EC } from "../../common/constants/errors";

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

export const validateUser = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ValidationError(EC.AUTH_TOKEN_IS_REQUIRED);
    }

    const decoded = jwtUtil.verifyToken(token) as JwtPayload;
    const user = await authService.findUser(decoded.userId);
    if (!user) {
      throw new NotFoundError(EC.INVALID_USER);
    }

    request.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
