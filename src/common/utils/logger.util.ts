import winston from "winston";
import configuration from "../../v1/configurations/config";

const logger = winston.createLogger({
  level: configuration.env === "dev" ? "debug" : "info",
  defaultMeta: { environment: configuration.env },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Add a stream for Morgan integration
export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
