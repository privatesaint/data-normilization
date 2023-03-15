import { Response, Request, NextFunction } from "express";
import { UniqueViolationError } from "objection";

export default (err, req: Request, res: Response, next: NextFunction) => {
  const error = { ...err };
  error.statusCode = err.statusCode || 500;

  // handle validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof UniqueViolationError) {
    return res.status(400).json({
      message: "Record already exists",
    });
  }

  error.message = err.message || "Internal Server Error.";

  return res.status(error.statusCode).json({
    message: error.message,
  });
};
