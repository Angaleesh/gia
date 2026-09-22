import { Router } from "express";
import { postChat } from "../controllers/chat.controller";

const route = Router();

route.get("/", postChat);

export default route;
