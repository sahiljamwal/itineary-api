import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  constructor(private _service = authService) {}

  public registerUser = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.registerUser();
      return response.status(201).send(data);
    } catch (error) {
      return next(error);
    }
  };

  public loginUser = async (
    _request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.loginUser();
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };
}

export default new AuthController();
