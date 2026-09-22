import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const postChat = expressAsyncHandler((req: Request, res: Response) => {
  res.json({
    api: "endpoint",
  });
});

