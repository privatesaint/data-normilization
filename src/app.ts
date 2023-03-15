import * as dotenv from "dotenv";
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import { createServer } from "http";
import { Model } from "objection";

import knexClient from "./config/connectionInstance";

dotenv.config();

// Give the knex instance to objection.
Model.knex(knexClient);

import routes from "./routes/v1/users";
import ErrorHandler from "./utils/ErrorHandler";
import errorMiddleware from "./middlewares/errors";

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();

const httpServer = createServer(app);

// config cors
app.use(cors());

// disable powered-by xp
app.disable("x-powered-by");

app.use(express.json());

app.set("trust proxy", 1); // trust first proxy

app.get("/", (req, res, next) => {
  return res.status(200).json({
    msg: "Hello World",
  });
});

// routes
app.use("/", routes);

// error handlers
app.use("*", (req: Request, res: Response, next: NextFunction) =>
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
);

// error handler
app.use(errorMiddleware);

export { app, httpServer };
