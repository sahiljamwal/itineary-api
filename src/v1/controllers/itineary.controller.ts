import { NextFunction, Request, Response } from "express";
import itinearyService from "../services/itineary.service";

class ItinearyController {
  constructor(private _service = itinearyService) {}

  public create = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.create();
      return response.status(201).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public get = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.get();
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public getById = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.getById();
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public update = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.update();
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public delete = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await this._service.delete();
      return response.sendStatus(200);
    } catch (error) {
      return next(error);
    }
  };
}

export default new ItinearyController();
