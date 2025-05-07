import { NextFunction, Request, Response } from "express";
import { itinearySchema } from "../helpers/joi-schema.helper";
import { ValidationError } from "../../common/errors/custom.error";
import { IFetchItineary } from "../types/itineary.type";
import configuration from "../configurations/config";
import cache from "../../common/utils/cache.util";
import { IItineary } from "../types/models/itineararies.type";
import itinearyService from "../services/itineary.service";

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

export const getCachedRecord = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const cacheKey = `${configuration.env}:${request.user._id}:itineararies:${request.params.id}`;
    const itineary = cache.get<IItineary>(cacheKey);
    if (itineary) {
      itinearyService.checkItineary(itineary, request.user._id);
      return response.status(200).send(itineary);
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

export const validateShareableItinearyId = async (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  try {
    request.params = await itinearySchema["share"][
      "shareableItinearyParamsSchema"
    ].validateAsync(request.params, {
      errors: { wrap: { label: "" } },
    });

    return next();
  } catch (error) {
    return next(new ValidationError((error as Error).message));
  }
};
