import mongoose from "mongoose";
import configuration from "../../v1/configurations/config";
import logger from "./logger.util";

export const createMongoConnection = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const MONGO_URL = configuration.mongoDbUrl;
      await mongoose.connect(MONGO_URL, {
        minPoolSize: 5,
      });

      logger.info("DB connected");
    } else {
      logger.info("Db already connected, reusing the connection");
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
