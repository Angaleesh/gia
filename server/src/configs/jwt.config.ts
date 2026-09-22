import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { HttpError } from "../middlewares/error.middleware";
import errorMessage from "../lang/error.message";
dotenv.config();

export const jwtConfig = async (
  data: object,
  key: string,
  expiresIn: any = "30d"
): Promise<string> => {
  try {
    return jwt.sign(data, key ?? "", { expiresIn });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const verifyToken = async (token: string, key: string) => {
  try {
    return jwt.verify(token, key);
  } catch (error: any) {
    throw new HttpError(errorMessage.TOKEN_EXPIRY, 401);
  }
};
