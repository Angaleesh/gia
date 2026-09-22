import { NextFunction, Request, Response } from "express";
import { HttpError } from "./error.middleware";

export default async (req: Request, res: Response, next: NextFunction) => {
  next(new HttpError(`Not Found: ${req?.originalUrl}`, 404));
};
