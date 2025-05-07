import express from "express";
import authController from "../controllers/auth.controller";
import {
  validateUserLogin,
  validateUserRegisteration,
} from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateUserRegisteration,
  authController.registerUser
);
authRouter.post("/login", validateUserLogin, authController.loginUser);

export default authRouter;
