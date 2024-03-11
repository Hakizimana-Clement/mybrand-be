const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

// import controller
const {
  getAllBlogs,
  createBlog,
  GetSingleBlog,
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
  .patch("/blogs/:id", async (req, res) => {
    // step 1. Get id from client
    const { id } = req.params;
    // step 2. use try/catch block to prevent error can occur
    try {
      // step 1. find the post by id.
      const blog = await Blog.findOne({ _id: id });

      // step 2. check the field  you want to update it one by one.
      // title
      if (req.body.title) {
        blog.title = req.body.title;
      }
      // writer,
      if (req.body.writer) {
        blog.writer = req.body.writer;
      }
      // writeImage
      if (req.body.writeImag) {
        blog.writeImag = req.body.writeImag;
      }
      // blogImage
      if (req.body.blogImage) {
        blog.blogImage = req.body.blogImage;
      }
      // blog content
      if (req.body.content) {
        blog.content = req.body.content;
      }

      // step 3. save in database
      await blog.save();

      // step 4. send to saved blog
      res.send(blog);
    } catch (error) {
      res.status(404).send({ error: "Blog doesn't exist" });
    }
  })

  //////////////////////////////////
  // Delete blog
  //////////////////////////////////
  .delete("/blogs/:id", async (req, res) => {
    const { id } = req.params;

    try {
      // step 1. find be id and delete
      await Blog.deleteOne({ _id: id });
      //  step 2. send not content code status and then send empty object
      res.status(204).send();
    } catch (error) {
      res.status(404).send({ error: "Blog doesn't exist" });
    }
  });
module.exports = router;
