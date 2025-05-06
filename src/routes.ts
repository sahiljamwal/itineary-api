import express, { NextFunction, Request, Response } from "express";
import { SystemError } from "./common/errors/custom.error";
import { EC } from "./common/constants/errors";
import mongoose from "mongoose";
import v1Router from "./v1/routes/route";

const apiRouter = express.Router();

apiRouter.get(
  "/health",
  (_request: Request, response: Response, next: NextFunction) => {
    try {
      if (mongoose.connection.readyState === 1) {
        return response.sendStatus(200);
      }

      throw new SystemError(EC.ERROR_IN_API);
    } catch (error) {
      return next(new SystemError(EC.ERROR_IN_API));
    }
  }
);

apiRouter.use("/v1", v1Router);

export default apiRouter;
