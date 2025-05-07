import { NextFunction, Request, Response } from "express";
import itinearyService from "../services/itineary.service";
import { IFetchItineary } from "../types/itineary.type";

class ItinearyController {
  constructor(private _service = itinearyService) {}

  public create = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.create(request.body, request.user);
      return response.status(201).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public get = async (
    request: Request<any, any, any, IFetchItineary["query"]>,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.get(request.query, request.user);
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public getById = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.getById(request.params.id, request.user);
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public update = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.update(
        request.params.id,
        request.body,
        request.user
      );
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public delete = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await this._service.delete(request.params.id, request.user);
      return response.sendStatus(200);
    } catch (error) {
      return next(error);
    }
  };
}

export default new ItinearyController();
