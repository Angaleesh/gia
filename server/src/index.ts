import express, { Request, Response, Router } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import dbConfig from "./configs/db.config";
import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/not-found.middleware";
import successMessage from "./lang/success.message";
import routes from "./routes";

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
dbConfig();
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send(successMessage.APP_STATUS);
});

routes.forEach((route: { route: string; router: Router }) => {
  app.use(`/api${route?.route}`, route?.router);
  console.log(`api${route?.route}`)
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);
