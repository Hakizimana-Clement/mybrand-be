// import blogs controller
import {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
} from "../controllers/blog.controllers";

// validation
import isValid from "../middleware/blogMiddleware";
import isUpdateValid from "../middleware/blogUpdateMiddleware";

import {
  createComment,
  getAllComments,
} from "../controllers/comment.controllers";
import isCommentValid from "../middleware/commentMiddleware";
// const commentRouter = express.Router();
import express from "express";
const blogRouter = express.Router();

////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// Get all blogs
blogRouter
  .get("/", httpGetAllBlogs)
  // Create blog
  .post("/", isValid, httpCreateBlog)
  // Get individual blog
  .get("/:id", httpGetSingleBlog)
  // Update blog
  .patch("/:id", isUpdateValid, httpUpdateBlog)
  // Delete blog
  .delete("/:id", httpDeleteBlog)

  // commentRouter
  // get all comment
  .get("/:id/comments", getAllComments)

  // Create comment
  .post("/:id/comments", isCommentValid, createComment);

// export all routers
export default blogRouter;
