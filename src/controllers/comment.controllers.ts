import { Request, Response } from "express";
import mongoose from "mongoose";
import CommentModel from "../models/commentModels";
import BlogModel from "../models/blogModels";

////////////////////////////////
// create comment
////////////////////////////////
const createComment = async (req: Request, res: Response) => {
  // blog Id
  const { id } = req.params;
  try {
    //  verify if it's mongoose id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog doesn't exist",
      });
    }

    // verify blog id
    const oneBlog = await BlogModel.findById(id);
    if (!oneBlog) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog doesn't exist",
      });
    }

    // create new comments
    const newComment = new CommentModel({
      blog_id: id,
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
    });

    // save in comment collection
    await newComment.save();

    // save in blog comment array
    oneBlog.comments.push(newComment._id);
    await oneBlog.save();

    const myBlogWithCommentData = await BlogModel.findById(id).populate(
      "comments"
    );
    console.log(myBlogWithCommentData);

    res.status(201).json({
      status: "201",
      message: "Created",
      comments: newComment,
      blog: myBlogWithCommentData,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      status: "404",
      message: "bad request",
    });
  }
};

////////////////////////////////
// get all comments
////////////////////////////////
const getAllComments = async (req: Request, res: Response) => {
  // blog id
  const { id } = req.params;

  try {
    // check if is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog doesn't exist",
      });
    }

    const blogId = await BlogModel.findById(id);

    if (!blogId) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog doesn't exist",
      });
    }
    console.log(blogId);
    const myComment = await BlogModel.findById(id).populate("comments");

    res.status(200).json({
      status: "200",
      message: "Success",
      // comments: blogId,
      blog: myComment,
    });
  } catch (error) {
    res.status(404).json({
      status: "404",
      message: "Not found",
      error: "Blog doesn't exist",
    });
  }
};
export { createComment, getAllComments };
