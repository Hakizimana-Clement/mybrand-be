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

import isValid from "../middleware/blogMiddleware";
////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// Get all blogs
blogRouter
  .get("/", httpGetAllBlogs)
  // Create blog
  .post("/", isValid, httpCreateBlog)
  // Get individual blog
  .get("/:id", httpGetSingleBlog)
  // Update blog
  .patch("/:id", httpUpdateBlog)
  // Delete blog
  .delete("/:id", httpDeleteBlog);

// export all routers
// module.exports = blogRouter;
export default blogRouter;
