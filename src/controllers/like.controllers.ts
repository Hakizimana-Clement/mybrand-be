import { Request, Response } from "express";
import mongoose from "mongoose";
import blogModel from "../models/blogModels";
import likeModel from "../models/likeModels";
///////////////////////////////
// get all likes
///////////////////////////////
const getAllLikes = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Blog doesn't exist" });
    }

    const oneBlog = await blogModel.findById(id);

    if (!oneBlog) {
      return res.status(404).json({ error: "Blog doesn't exist" });
    }

    // => blog details with likes
    // const blogWithLike = await blogModel.findById(id).populate("likes");
    // res.status(200).json({ message: "success", blog: blogWithLike });

    //=> blog with likes without enought details
    // res.status(200).json({ message: "success", blog: oneBlog });

    //=> likes only
    res
      .status(200)
      .json({ status: "200", message: "success", likes: oneBlog.likes });
  } catch (error) {
    return res.status(404).json({ status: "404", error: "Blog doesn't exist" });
  }
};

///////////////////////////////
// create likes
///////////////////////////////

const createLike = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // step 1. checking is blog with that id exist
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog doesn't exist",
      });
    }

    const oneBlog = await blogModel.findById(id);

    if (!oneBlog) {
      return res.status(404).json({
        status: "404",
        message: "Not found",
        error: "Blog doesn't exist",
      });
    }
    // step 2. create new like
    const newLike = new likeModel({
      blog_id: id,
    });
    // step 3. save like in like collection (table)
    await newLike.save();
    // step 4. add like in one blog
    oneBlog.likes.push(newLike._id);
    // step 5. save in blog
    await oneBlog.save();
    // console.log(newLike, oneBlog);

    // step 5.2. get blog with like id
    // const blogData = await blogModel.findById(id).populate("blog");
    // step 6. return the response of like after to create it
    res.status(201).json({
      status: "201",
      message: "Created",
      Like: newLike,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ status: "500", error: "Internal server Error" });
  }
};

export { getAllLikes, createLike };
