import express from "express";
import {
  createComment,
  getAllComments,
} from "../controllers/comment.controllers";
const commentRouter = express.Router();

commentRouter
  // // get all comment
  .get("/:id/comments", getAllComments)

  // // Create comment
  .post("/:id/comments", createComment);

export default commentRouter;
