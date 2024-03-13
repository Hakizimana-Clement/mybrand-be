const express = require("express");
const blogRouter = express.Router();
// import blogs controller
const {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
} = require("../controllers/blog.controllers");
const isValid = require("../middleware/blogMiddleware");
////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// Get all blogs
blogRouter
  .get("/", httpGetAllBlogs)
  // Create blog
  .post("/", isValid, httpCreateBlog)
  // Get individual blog
  .get("/:id", httpGetSingleBlog)
  // Update blog
  .patch("/:id", isValid, httpUpdateBlog)
  // Delete blog
  .delete("/:id", isValid, httpDeleteBlog);

// export all routers
module.exports = blogRouter;
