import express from "express";
import itenaryController from "../controllers/itineary.controller";
import {
  validateItineary,
  validateItinearyId,
} from "../middlewares/itineary.middleware";
import { validateUser } from "../middlewares/auth.middleware";

const itinearyRouter = express.Router();

itinearyRouter.use(validateUser);
itinearyRouter.post("/", validateItineary, itenaryController.create);
itinearyRouter.get("/", itenaryController.get);
itinearyRouter.get("/:id", validateItinearyId, itenaryController.getById);
itinearyRouter.put(
  "/:id",
  validateItinearyId,
  validateItineary,
  itenaryController.update
);
itinearyRouter.delete("/:id", validateItinearyId, itenaryController.delete);

export default itinearyRouter;
