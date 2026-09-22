import { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
  status: number;
  // fields
  constructor(message: string, statusCode: number = 500) {
    super(`${statusCode}^^^${message}`);
    this.status = statusCode;
    this.name = "";
  }
}

export default async function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.name = "";
  if (err?.message.split("^^^").length > 1) {
    err.status = parseInt(err?.message.split("^^^")[0]);
    err.message = err?.message.split("^^^")[1];
  } 
  res.status(err?.status || 500).json({
    success: false,
    message: err?.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
