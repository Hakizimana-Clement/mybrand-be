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
import authCheck from "../middleware/authCheck";

////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// Get all blogs
blogRouter
  .get("/", httpGetAllBlogs)
  // Create blog
  .post("/", isValid, authCheck(["user", "admin"]), httpCreateBlog)
  // Get individual blog
  .get("/:id", httpGetSingleBlog)
  // Update blog
  .patch("/:id", isUpdateValid, authCheck(["user", "admin"]), httpUpdateBlog)
  // Delete blog
  .delete("/:id", isDeleteValid, authCheck(["user", "admin"]), httpDeleteBlog)

  ////////////////////////////// COMMENT ROUTES /////////////////////////////////////
  // get all comment
  .get("/:id/comments", authCheck(["user", "admin"]), getAllComments)

  // Create comment
  .post(
    "/:id/comments",
    authCheck(["user", "admin"]),
    isCommentValid,
    createComment
  )

  ////////////////////////////// LIKE ROUTES /////////////////////////////////////

  // get all likes
  .get("/:id/likes", authCheck(["user", "admin"]), getAllLikes)
  // create like
  .post("/:id/likes", authCheck(["user", "admin"]), createLike);

// export all routers
export default blogRouter;
