import { Request, Response } from "express";
import mongoose from "mongoose";
import CommentModel from "../models/commentModels";
import BlogModel from "../models/blogModels";
import jwt from "jsonwebtoken";

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
        error: "Blog Not Found",
      });
    }

    // verify blog id
    const oneBlog = await BlogModel.findOne({ _id: id });
    if (!oneBlog) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog Not Found",
      });
    }

    // decode to get name from user token
    const token: any = req.headers.authorization?.split(" ")[1];
    const decodedToken: any = jwt.verify(token, process.env.SECRET as string);
    const { name } = decodedToken;

    // create new comments
    const newComment = new CommentModel({
      blog_id: id,
      name,
      comment: req.body.comment,
    });

    // save in comment collection
    await newComment.save();

    // save in blog comment array
    oneBlog.comments.push(newComment._id);
    await oneBlog.save();

    // => blog data with comment
    // const myBlogWithCommentData = await BlogModel.findById(id).populate(
    //   "comments"
    // );
    // res.status(201).json({
    //   status: "201",
    //   message: "Created",
    //   blog: myBlogWithCommentData,
    // });
    // => comment only
    res.status(201).json({
      status: "201",
      message: "Created",
      comments: {
        name: newComment.name,
        comment: newComment.comment,
      },
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
        error: "Comment Not Found",
      });
    }

    const blogId = await BlogModel.findById(id);

    if (!blogId) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Comment Not Found",
      });
    }

    // => blog data with comment and blog data too
    // => blog data with comment array only
    const blogComments = await BlogModel.findById(id)
      .select("comments")
      .populate({
        path: "comments",
        // select: "-blog_id -__v -_id -createdAt -updatedAt",
        // select: "-blog_id -__v -_id -createdAt -updatedAt",
      });
    res.status(200).json({
      status: "200",
      message: "Success",
      comments: blogComments?.comments,
    });
    // // => comments only
    // res.status(200).json({
    //   status: "200",
    //   message: "Success",
    //   comments: blogId.comments,
    // });
  } catch (error) {
    res.status(404).json({
      status: "404",
      message: "Not found",
      error: "Comment Not Found",
    });
  }
};
export { createComment, getAllComments };
