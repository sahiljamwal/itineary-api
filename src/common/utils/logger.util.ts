import winston from "winston";
import configuration from "../../v1/configurations/config";

const logger = winston.createLogger({
  level: "INFO",
  defaultMeta: { environment: configuration.env },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
