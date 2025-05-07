import { IUser } from "./models/user.type";
import { Request } from "express";

export {};

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
