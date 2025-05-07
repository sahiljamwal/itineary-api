import express from "express";
import itenaryController from "../controllers/itineary.controller";
import {
  getCachedRecord,
  validateItineary,
  validateItinearyId,
  validateItinearyPaginationReq,
} from "../middlewares/itineary.middleware";
import { validateUser } from "../middlewares/auth.middleware";

const itinearyRouter = express.Router();

itinearyRouter.use(validateUser);
itinearyRouter.post("/", validateItineary, itenaryController.create);
itinearyRouter.get("/", validateItinearyPaginationReq, itenaryController.get);
itinearyRouter.get(
  "/:id",
  validateItinearyId,
  getCachedRecord,
  itenaryController.getById
);
itinearyRouter.put(
  "/:id",
  validateItinearyId,
  validateItineary,
  itenaryController.update
);
itinearyRouter.delete("/:id", validateItinearyId, itenaryController.delete);

export default itinearyRouter;
