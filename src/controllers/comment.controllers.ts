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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Blog doesn't exist" });
    }

    const blogId = await BlogModel.findById(id);

    if (!blogId) {
      return res.status(404).json({ error: "Blog doesn't exist" });
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

    blogId.comments.push(newComment);
    // console.log(blogId.comments);

    await blogId.save();
    res.status(201).json({ message: "Success", comments: newComment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "bad request" });
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
      return res.status(404).json({ error: "Blog doesn't exist" });
    }

    const blogId = await BlogModel.findById(id);
    if (!blogId) return res.status(404).json({ error: "Blog doesn't exist" });
    const blogComments = blogId.comments;
    console.log(blogComments);
    res.status(200).json({ message: "Success", data: blogComments });
  } catch (error) {
    res.status(404).json({ error: "Blog doesn't exist !!!" });
  }
};
export { createComment, getAllComments };
