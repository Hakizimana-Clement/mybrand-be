const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// import controller
const {
  getAllBlogs,
  createBlog,
  GetSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");
///////////////////////////////////
// Get all blogs
//////////////////////////////////
router
  .get("/blogs", getAllBlogs)
  //////////////////////////////////
  // Create blog
  //////////////////////////////////
  .post("/blogs", createBlog)
  //////////////////////////////////
  // Get individual blog
  //////////////////////////////////
  .get("/blogs/:id", GetSingleBlog)
  //////////////////////////////////
  // Update blog
  //////////////////////////////////
  .patch("/blogs/:id", updateBlog)
  //////////////////////////////////
  // Delete blog
  //////////////////////////////////
  .delete("/blogs/:id", deleteBlog);

// export all routers
module.exports = router;
