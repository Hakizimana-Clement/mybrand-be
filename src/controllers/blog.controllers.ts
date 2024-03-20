// const Blog = require("../models/blogModel");
import { Request, Response } from "express";
import Blog from "../models/blogModels";
import mongoose from "mongoose";
///////////////////////////////////
// Get all blogs
//////////////////////////////////
const httpGetAllBlogs = async (req: Request, res: Response) => {
  // step 1. we use find method and store in varibale
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  // step 2. send data
  // res.json(blogs);
  res.status(200).json({ status: "200", message: "success", blogs: blogs });
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
    // check if id is valid as mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "404",
        message: "Blog Not found",
        error: "Blog Not Found",
      });
    }
    // step 3. use findOne method
    const blog = await Blog.findOne({ _id: id });
    // check if that blog exist
    if (!blog)
      return res.status(404).json({
        status: "404",
        message: "Blog Not found",
        error: "Blog Not Found",
      });
    // step 4. send blog data

    res.status(200).json({ status: "200", message: "success", blog: blog });
  } catch (error) {
    // if id not found send error message
    console.log(error);
    res.status(404).json({
      status: "404",
      message: "Blog Not found",
      // error: "Blog Not Found",
    });
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
  res.status(201).json({ status: "201", message: "Blog created", blog: blog });
};
// //////////////////////////////////
// // Update blog
// //////////////////////////////////
const httpUpdateBlog = async (req: Request, res: Response) => {
  // step 1. Get id from client
  const { id } = req.params;
  // check if data is empty before saving to database
  // const allData = req.body;
  // if (Object.keys(allData).length === 0) {
  //   return res.status(400).json({
  //     status: "400",
  //     message: "Bad request",
  //     error:
  //       "Incomplete Fields: Please fill in all the required fields to update the blog",
  //   });
  // }
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog Not Found",
      });
    }
    res.status(200).json({ status: "200", message: "Success", blog: blog });
  } catch (error) {
    res.status(404).json({
      status: "404",
      message: "Not found",
      error: "Blog Not Found",
    });
  }
};

//////////////////////////////////
// Delete blog
//////////////////////////////////
const httpDeleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog Not Found",
      });
    }
    // step 1. find be id and delete
    await Blog.deleteOne({ _id: id });
    //  step 2. send not content code status and then send empty object
    res.status(204).json({ status: "201", message: "No content" });
  } catch (error) {
    res.status(404).json({
      status: "404",
      message: "Not found",
      error: "Blog Not Found",
    });
  }
};

export {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
};
