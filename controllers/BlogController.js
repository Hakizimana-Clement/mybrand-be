const Blog = require("../models/blog");
///////////////////////////////////
// Get all blogs
//////////////////////////////////
const getAllBlogs = async (req, res) => {
  // step 1. we use find method and store in varibale
  const blogs = await Blog.find();
  // step 2. send data
  res.send(blogs);
};
//////////////////////////////////
// Get individual blog
//////////////////////////////////

//////////////////////////////////
// Create blog
//////////////////////////////////

const createBlog = async (req, res) => {
  // step 1. Take all data from client but on object
  const blog = new Blog({
    title: req.body.title,
    writer: req.body.writer,
    writeImage: req.body.writeImage,
    blogImage: req.body.blogImage,
    content: req.body.content,
  });
  // step 2. save them
  await blog.save();
  // step 3. send data
  res.send(blog);
};
//////////////////////////////////
// Update blog
//////////////////////////////////
//////////////////////////////////
// Delete blog
//////////////////////////////////

module.exports = { getAllBlogs, createBlog };
