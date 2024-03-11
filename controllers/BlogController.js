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
const GetSingleBlog = async (req, res) => {
  // step 1. Get id from client
  const { id } = req.params;
  // step 2. use try/catch block to prevent error can occur
  try {
    // step 3. use findOne method
    const blog = await Blog.findOne({ _id: id });
    // step 4. send blog data
    res.send(blog);
  } catch (error) {
    // if id not found send error message
    res.status(404).send({ error: "Blog doesn't exist" });
  }
};

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

module.exports = { getAllBlogs, createBlog, GetSingleBlog };
