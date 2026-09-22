import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { HttpError } from "./error.middleware";
import errorMessage from "../lang/error.message";
import expressAsyncHandler from "express-async-handler";

export interface AuthenticatedRequest extends Request {
  user?: any;
  file?: any;
}

export const authMiddleware = expressAsyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        if (!token) {
          throw new HttpError(errorMessage.UNAUTHORIZED, 401);
        }

        try {
          const data = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY || "");
          req.user = data;
          next();
        } catch (err) {
          throw new HttpError(errorMessage.UNAUTHORIZED, 401);
        }
      } else {
        throw new HttpError(errorMessage.TOKEN_NOT_FOUND, 404);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
