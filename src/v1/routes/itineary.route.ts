import express from "express";
import itenaryController from "../controllers/itineary.controller";

const itinearyRouter = express.Router();

itinearyRouter.post("/", itenaryController.create);
itinearyRouter.get("/", itenaryController.get);
itinearyRouter.get("/:id", itenaryController.getById);
itinearyRouter.put("/:id", itenaryController.update);
itinearyRouter.delete("/:id", itenaryController.delete);

export default itinearyRouter;
