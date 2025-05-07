import Joi from "joi";
import { IRegisterUserPayload, ILoginUserPayload } from "../types/auth.type";

const userRegisterSchema = Joi.object<IRegisterUserPayload>().keys({
  email: Joi.string().email().required().trim().label("email"),
  password: Joi.string().min(8).max(32).required().label("password"),
  name: Joi.string()
    .regex(/^[A-Za-z ]+$/)
    .required()
    .trim()
    .label("name")
    .messages({
      "string.pattern.base": '"name" should contain only letters',
    }),
});

const userLoginSchema = Joi.object<ILoginUserPayload>().keys({
  email: Joi.string().email().required().trim().label("email"),
  password: Joi.string().min(8).max(32).required().label("password"),
});

export const userAuthSchema = {
  register: userRegisterSchema,
  login: userLoginSchema,
};
