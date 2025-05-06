import { createServer } from "http";
import configuration from "./v1/configurations/config";
import app from "./app";
import logger from "./common/utils/logger.util";
import { createMongoConnection } from "./common/utils/db.util";

const PORT = configuration.port;
const server = createServer(app);

server.listen(PORT, async () => {
  try {
    await createMongoConnection();
    logger.info(`Server started at PORT ${PORT}`);
  } catch (error) {
    logger.error({ error });
    process.exit(1);
  }
});
