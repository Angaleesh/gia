import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export default expressAsyncHandler((req: Request, res: Response) => {
  res.json({
    api: "endpoint",
  });
});
