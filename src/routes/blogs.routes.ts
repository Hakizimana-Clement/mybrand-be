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

// validation
import isValid from "../middleware/blogMiddleware";
import isUpdateValid from "../middleware/blogUpdateMiddleware";
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
  .delete("/:id", httpDeleteBlog);

// export all routers
export default blogRouter;
