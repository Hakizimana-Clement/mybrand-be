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
import { isDeleteValid, isValid } from "../middleware/blogMiddleware";
import isUpdateValid from "../middleware/blogUpdateMiddleware";
import isCommentValid from "../middleware/commentMiddleware";
import { isAdmin, isLoggedIn } from "../middleware/authenticationMiddleware";

////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// Get all blogs
blogRouter
  .get("/", httpGetAllBlogs)
  // Create blog
  .post("/", isAdmin, isValid, httpCreateBlog)
  // Get individual blog
  .get("/:id", httpGetSingleBlog)
  // Update blog
  .patch("/:id", isAdmin, isUpdateValid, httpUpdateBlog)
  // Delete blog
  .delete("/:id", isAdmin, httpDeleteBlog)

  ////////////////////////////// COMMENT ROUTES /////////////////////////////////////
  // get all comment
  .get("/:id/comments", isLoggedIn, isAdmin, getAllComments)

  // Create comment
  .post("/:id/comments", isLoggedIn, isAdmin, isCommentValid, createComment)

  ////////////////////////////// LIKE ROUTES /////////////////////////////////////

  // get all likes
  .get("/:id/likes", isLoggedIn, isAdmin, getAllLikes)
  // .get("/:id/likes", getAllLikes)
  // create like
  .post("/:id/likes", isLoggedIn, isAdmin, createLike);

// export all routers
export default blogRouter;
