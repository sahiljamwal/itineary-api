import express from "express";
import authRouter from "./auth.route";
import itenaryRouter from "./itineary.route";

const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/itineraries", itenaryRouter);

export default v1Router;
