const express = require("express");
const router = express.Router();
// import blogs controller
const {
  getAllBlogs,
  createBlog,
  GetSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");
////////////////////////////// BLOGS ROUTES /////////////////////////////////////
// Get all blogs
router
  .get("/", getAllBlogs)
  // Create blog
  .post("/", createBlog)
  // Get individual blog
  .get("/:id", GetSingleBlog)
  // Update blog
  .patch("/:id", updateBlog)
  // Delete blog
  .delete("/:id", deleteBlog);

////////////////////////////// QUERRIES ROUTES /////////////////////////////////////
// create querry
router.post("/querries", (req, res) => {});
// export all routers
module.exports = router;
