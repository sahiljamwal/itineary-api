import express from "express";
import itenaryController from "../controllers/itineary.controller";
import {
  getCachedRecord,
  validateItineary,
  validateItinearyId,
  validateItinearyPaginationReq,
  validateShareableItinearyId,
} from "../middlewares/itineary.middleware";
import { validateUser } from "../middlewares/auth.middleware";
import itinearyController from "../controllers/itineary.controller";

const itinearyRouter = express.Router();

itinearyRouter.get(
  "/share/:shareableId",
  validateShareableItinearyId,
  itinearyController.visitShareableLink
);

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
itinearyRouter.get(
  "/:id/share",
  validateItinearyId,
  itinearyController.getShareableLink
);

export default itinearyRouter;
