import { NextFunction, Request, Response } from "express";
import { itinearySchema } from "../helpers/joi-schema.helper";
import { ValidationError } from "../../common/errors/custom.error";
import { IFetchItineary } from "../types/itineary.type";

export const validateItineary = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.body = await itinearySchema["create"].validateAsync(request.body, {
      errors: { wrap: { label: "" } },
    });

    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};

export const validateItinearyId = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.params = await itinearySchema["find"][
      "itinearyParamsSchema"
    ].validateAsync(request.params, {
      errors: { wrap: { label: "" } },
    });

    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};

export const validateItinearyPaginationReq = async (
  request: Request<any, any, any, IFetchItineary["query"]>,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.query = (await itinearySchema["find"][
      "itinearyQuerySchema"
    ].validateAsync(request.query, {
      errors: { wrap: { label: "" } },
    })) as any;

    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};
