import { Request, Response } from "express";
import mongoose from "mongoose";
import blogModel from "../models/blogModels";
import likeModel from "../models/likeModels";
import jwt from "jsonwebtoken";
///////////////////////////////
// get all likes
///////////////////////////////
const getAllLikes = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Blog Not Found" });
    }

    const oneBlog = await blogModel.findById(id);

    if (!oneBlog) {
      return res.status(404).json({ error: "Blog Not Found" });
    }

    // => blog details with likes
    // const blogWithLike = await blogModel.findById(id).populate("likes");
    const blogWithLike = await blogModel.findById(id).select("likes").populate({
      path: "likes",
      select: "-blog_id -__v",
    });

    res.status(200).json({ message: "success", blog: blogWithLike });

    //=> blog with likes without enought details
    // res.status(200).json({ message: "success", blog: oneBlog });

    //=> likes only
    // res
    //   .status(200)
    //   .json({ status: "200", message: "success", likes: oneBlog.likes });
  } catch (error) {
    return res.status(404).json({ status: "404", error: "Blog Not Found" });
  }
};

///////////////////////////////
// create likes or remove likes
///////////////////////////////

const createLike = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Decode to get the user ID from the token
  const token: any = req.headers.authorization?.split(" ")[1];
  const decodedToken: any = jwt.verify(token, process.env.SECRET as string);
  console.log(decodedToken);
  // user id
  const userId = decodedToken._id;
  // console.log("user id", userId);

  try {
    // Check if the blog with that id exists
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "404",
        message: "id Not found",
        error: "Blog Not Found",
      });
    }

    const oneBlog = await blogModel.findOne({ _id: id });
    if (!oneBlog) {
      return res.status(404).json({
        status: "404",
        message: "Blog Not found",
        error: "Blog Not Found",
      });
    }

    // Check if the user has already liked the blog
    const existingLike = await likeModel.findOne({
      blog_id: id,
      user_id: userId,
    });

    console.log("blogId and userID ", existingLike);
    if (existingLike) {
      // If the like already exists, remove it
      await likeModel.findByIdAndDelete(existingLike._id);
      // Remove the like ID from the blog's likes array
      oneBlog.likes = oneBlog.likes.filter(
        (likeId: mongoose.Types.ObjectId) =>
          likeId.toString() !== existingLike._id.toString()
      );
    } else {
      // If the like doesn't exist, create a new like
      const newLike = new likeModel({
        blog_id: id,
        user_id: userId,
      });
      await newLike.save();
      // Add the new like ID to the blog's likes array
      oneBlog.likes.push(newLike._id);
    }

    // Save the updated blog data
    await oneBlog.save();

    res.status(201).json({
      status: "201",
      message: "Like toggled successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: "400", error: "Bad request" });
  }
};

export { getAllLikes, createLike };
