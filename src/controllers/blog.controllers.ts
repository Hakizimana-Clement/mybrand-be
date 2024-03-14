// const Blog = require("../models/blogModel");
import { Request, Response } from "express";
import Blog from "../models/blogModels";
///////////////////////////////////
// Get all blogs
//////////////////////////////////
const httpGetAllBlogs = async (req: Request, res: Response) => {
  // step 1. we use find method and store in varibale
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  // step 2. send data
  // res.json(blogs);
  res.json({ message: "success", data: blogs });
};
//////////////////////////////////
// Get individual blog
//////////////////////////////////
const httpGetSingleBlog = async (req: Request, res: Response) => {
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
const httpCreateBlog = async (req: Request, res: Response) => {
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
// //////////////////////////////////
// // Update blog
// //////////////////////////////////
const httpUpdateBlog = async (req: Request, res: Response) => {
  // step 1. Get id from client
  const { id } = req.params;
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!blog) {
      res.status(404).json({ error: "Blog doesn't exist" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json({ error: "Blog doesn't exist" });
  }
};

//////////////////////////////////
// Delete blog
//////////////////////////////////
const httpDeleteBlog = async (req: Request, res: Response) => {
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

export {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
};
