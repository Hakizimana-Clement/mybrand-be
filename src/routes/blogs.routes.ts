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
// import { isAdminNow, isLoggedInNow } from "../middleware/authenticationMiddleware";
import { isAdmin, isLogin } from "../middleware/authCheck";
// middleware
import upload from "../middleware/multerMiddleware";

////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// Get all blogs
blogRouter
  .get("/", httpGetAllBlogs)
  // Create blog
  // .post("/", httpCreateBlog)
  .post("/", isAdmin, upload.single("blogImage"), httpCreateBlog)
  // .post("/", isAdmin, isValid, upload.single("blogImage"), httpCreateBlog)

  // .post("/", isAdmin, isValid, httpCreateBlog)
  // Get individual blog
  .get("/:id", httpGetSingleBlog)
  // Update blog
  .patch("/:id", isAdmin, httpUpdateBlog)
  // .patch("/:id", isAdmin, isUpdateValid, httpUpdateBlog)
  // .patch("/:id", isAdminNow, httpUpdateBlog)
  // Delete blog
  .delete("/:id", isAdmin, httpDeleteBlog)

  ////////////////////////////// COMMENT ROUTES /////////////////////////////////////
  // get all comment
  .get("/:id/comments", isLogin, isAdmin, getAllComments)

  // Create comment
  .post("/:id/comments", isLogin, isAdmin, isCommentValid, createComment)

  ////////////////////////////// LIKE ROUTES /////////////////////////////////////

  // get all likes
  // .get("/:id/likes", isLogin, isAdmin, getAllLikes)
  .get("/:id/likes", isAdmin, getAllLikes)
  // .get("/:id/likes", getAllLikes)
  // create like
  // .post("/:id/likes", isLogin, isAdmin, createLike);
  .post("/:id/likes", isAdmin, createLike);

// export all routers
export default blogRouter;
