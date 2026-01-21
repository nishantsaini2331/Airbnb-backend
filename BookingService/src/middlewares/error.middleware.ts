import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";

export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  console.log(err.message);
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export const genericErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("object");
  console.log(err.statusCode);
  const statusCode = err.statusCode ?? 500;
  console.log(err.message);
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
};
