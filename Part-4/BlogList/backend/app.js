import express, { request, response } from "express";
import blogsRouter from "./controllers/blogs.js";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js";

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
