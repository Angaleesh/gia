import { Router } from "express";
import { postChat } from "../controllers/chat.controller";

const route = Router();

route.post("/", postChat);

export default route;
