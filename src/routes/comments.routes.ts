import express from "express";
import {
  createComment,
  getAllComments,
} from "../controllers/comment.controllers";
import isCommentValid from "../middleware/commentMiddleware";
const commentRouter = express.Router();

commentRouter
  // get all comment
  .get("/:id/comments", getAllComments)

  // Create comment
  .post("/:id/comments", isCommentValid, createComment);

export default commentRouter;
