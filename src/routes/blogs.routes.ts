// import express and router
import express from "express";
const blogRouter = express.Router();

// import blogs controller
import {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
} from "../controllers/blog.controllers";

// import like
import { getAllLikes, createLike } from "../controllers/like.controllers";
// import comment
import {
  createComment,
  getAllComments,
} from "../controllers/comment.controllers";

//////////// validation //////////////
import isValid from "../middleware/blogMiddleware";
import isUpdateValid from "../middleware/blogUpdateMiddleware";
import isCommentValid from "../middleware/commentMiddleware";

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

  ////////////////////////////// COMMENT ROUTES /////////////////////////////////////
  // get all comment
  .get("/:id/comments", getAllComments)

  // Create comment
  .post("/:id/comments", isCommentValid, createComment)

  ////////////////////////////// LIKE ROUTES /////////////////////////////////////

  // get all likes
  .get("/:id/likes", getAllLikes)
  // create like
  .post("/:id/likes", createLike);

// export all routers
export default blogRouter;
