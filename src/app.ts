import express, { json, Request, Response, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import apiRouter from "./routes";
import { errorHandler } from "./common/middlewares/error-handler.middleware";
import { morganStream } from "./common/utils/logger.util";
import { rateLimit } from "express-rate-limit";

const app = express();

app.use(helmet());
app.use(
  compression({
    filter: (req: Request, res: Response) =>
      req.headers["x-no-compression"] ? false : compression.filter(req, res),
  })
);
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(
  morgan(
    (tokens, req, res) => {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    },
    { stream: morganStream }
  )
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);

// API entrypoint
app.use("/api", apiRouter);

// Global error handler
app.use(errorHandler);

export default app;
