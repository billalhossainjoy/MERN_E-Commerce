import { NextFunction, Request, Response } from "express";
import AppConfig from "../config/config";
import Asynchandler from "./AsyncHandler";
import ErrorApi from "./CustomError";

export const NotFoundHandler = Asynchandler((req, res, next) =>
  next(new ErrorApi(404, "this route is not found"))
);

const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status ?? 500;
  const message =
    AppConfig.NODE_ENV === "development" ? err.message : "Server side error.";
  const error = AppConfig.NODE_ENV === "development" ? { ...err.errors } : undefined;

  res.status(statusCode).json({
    success: false,
    message,
    error
  });
};

export default ErrorHandler;
