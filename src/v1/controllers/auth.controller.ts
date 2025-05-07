import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  constructor(private _service = authService) {}

  public registerUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      await this._service.registerUser(request.body);
      return response.sendStatus(201);
    } catch (error) {
      return next(error);
    }
  };

  public loginUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this._service.loginUser(request.body);
      return response.status(200).send(data);
    } catch (error) {
      return next(error);
    }
  };
}

export default new AuthController();
