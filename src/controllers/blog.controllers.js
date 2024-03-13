const Blog = require("../models/blogModel");
///////////////////////////////////
// Get all blogs
//////////////////////////////////
const httpGetAllBlogs = async (req, res) => {
  // step 1. we use find method and store in varibale
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  // step 2. send data
  // res.json(blogs);
  res.json({ message: "success", data: blogs });
};
//////////////////////////////////
// Get individual blog
//////////////////////////////////
const httpGetSingleBlog = async (req, res) => {
  // step 1. Get id from client
  const { id } = req.params;
  console.info(id);
  // step 2. use try/catch block to prevent error can occur
  try {
    // step 3. use findOne method
    const blog = await Blog.findOne({ _id: id });
    // step 4. send blog data
    res.json(blog);
  } catch (error) {
    // if id not found send error message
    res.status(404).json({ error: "Blog doesn't exist" });
  }
};

//////////////////////////////////
// Create blog
//////////////////////////////////
const httpCreateBlog = async (req, res) => {
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
  res.json(blog);
};
//////////////////////////////////
// Update blog
//////////////////////////////////
const httpUpdateBlog = async (req, res) => {
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
    res.json(blog);
  } catch (error) {
    res.status(404).send({ error: "Blog doesn't exist" });
  }
};

//////////////////////////////////
// Delete blog
//////////////////////////////////
const httpDeleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // step 1. find be id and delete
    await Blog.deleteOne({ _id: id });
    //  step 2. send not content code status and then send empty object
    res.status(204).json();
  } catch (error) {
    res.status(404).json({ error: "Blog doesn't exist" });
  }
};
module.exports = {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
};
