import { response } from "express";
import { info, error } from "./logger.js";

const requestLogger = (request, response, next) => {
  info(request.method, request.path);
  info(request.body);
  next();
};

const unknownEndpoint = (request, response, next) => {
  info("Unknown Endpoint");
  response.status(404).json({
    error: "Unknown Endpoint!",
  });
};

const errorHandler = (error, request, response, next) => {
  info(error);
  if (error.name == "CastError") {
    response.status(400).json({
      error: "Malformatted Id",
    });
  } else if (error.name == "ValidationError") {
    response.status(400).json({
      error: error.message,
    });
  } else if (error.name == "EmptyRequestBodyError") {
    response.status(400).json({
      error: error.message,
    });
  } else if (error.name == "ItemNotFoundError") {
    response.status(404).json({
      message: error.message,
    });
  } else if (error.name == "EmptyCollectionError") {
    response.status(200).json({
      message: error.message,
    });
  } else {
    next(error);
  }
};

export { requestLogger, unknownEndpoint, errorHandler };
