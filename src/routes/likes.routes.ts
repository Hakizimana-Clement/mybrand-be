import express from "express";
import { getAllLikes } from "../controllers/like.controllers";
const likesRouter = express.Router();
likesRouter.get("/", getAllLikes);
export default likesRouter;
