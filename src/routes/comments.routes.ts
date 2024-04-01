import express from "express";
import { getAllLikes } from "../controllers/like.controllers";
import { getAllCommentsWithoutSingleBlog } from "../controllers/comment.controllers";
const commentsRouter = express.Router();

commentsRouter.get("/", getAllCommentsWithoutSingleBlog);

export default commentsRouter;
