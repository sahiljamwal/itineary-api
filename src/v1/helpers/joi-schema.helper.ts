import Joi, { CustomHelpers } from "joi";
import { IRegisterUserPayload, ILoginUserPayload } from "../types/auth.type";
import { ICreateItinearyPayload, IFetchItineary } from "../types/itineary.type";
import { Types } from "mongoose";

// Custom validators
function validateActivitiesWithinDateRange(
  activities: any,
  helpers: Joi.CustomHelpers
) {
  const { startDate, endDate } = helpers.state.ancestors[0];

  for (const activity of activities) {
    if (!(activity.time >= startDate && activity.time <= endDate)) {
      return helpers.error("any.invalid", {
        message: `Activity time "${activity.time}" must be between startDate "${startDate}" and endDate "${endDate}"`,
      });
    }
  }

  return activities;
}

function validateObjectId(value: string, helpers: CustomHelpers) {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}

// Schema

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

const activitySchema = Joi.object({
  time: Joi.date().required().label("Activity time"),
  description: Joi.string().trim().required().label("Activity description"),
  location: Joi.string().trim().required().label("Activity location"),
});

const createItinearySchema = Joi.object<ICreateItinearyPayload>().keys({
  title: Joi.string().trim().required().label("title"),
  destination: Joi.string().trim().required().label("destination"),
  startDate: Joi.date().required().label("Start Date"),
  endDate: Joi.date()
    .greater(Joi.ref("startDate"))
    .required()
    .label("End Date"),
  activities: Joi.array()
    .items(activitySchema)
    .custom(validateActivitiesWithinDateRange, "Validate activity times")
    .required()
    .label("Activities"),
});

const itinearyParamsSchema = Joi.object<IFetchItineary["params"]>().keys({
  id: Joi.string().required().custom(validateObjectId).label("id"),
});

const itinearyQuerySchema = Joi.object<IFetchItineary["query"]>().keys({
  page: Joi.number().optional().default(1).label("page"),
  limit: Joi.number().optional().default(10).label("limit"),
  filter: Joi.object<IFetchItineary["query"]["filter"]>()
    .keys({
      destination: Joi.string().optional().label("destination"),
    })
    .optional()
    .default({})
    .label("filter"),
  sort: Joi.object<IFetchItineary["query"]["sort"]>()
    .keys({
      createdAt: Joi.number().valid(1, -1).optional().label("createdAt"),
      startDate: Joi.number().valid(1, -1).optional().label("startDate"),
      title: Joi.number().valid(1, -1).optional().label("title"),
    })
    .optional()
    .default({ createdAt: -1 })
    .label("sort"),
});

export const itinearySchema = {
  create: createItinearySchema,
  find: { itinearyParamsSchema, itinearyQuerySchema },
  update: { itinearyParamsSchema },
  delete: { itinearyParamsSchema },
};
