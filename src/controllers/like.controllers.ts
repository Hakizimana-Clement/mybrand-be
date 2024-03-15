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

    res.status(200).json({ message: "success", likes: oneBlog.likes });
  } catch (error) {
    return res.status(404).json({ error: "Blog doesn't exist" });
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

    // check if user provide false as value
    const likeValue = req.body.like;
    if (likeValue === false) {
      return res.status(400).json({
        status: "400",
        message: "bad request",
        error: "Please provide like value",
      });
    }

    // step 2. create new like
    const newLike = new likeModel({
      like: likeValue,
      blog_id: id,
    });
    // step 3. save like in like collection (table)
    await newLike.save();

    // step 4. add like in one blog
    oneBlog.likes.push(newLike);
    // console.log(oneBlog.likes);

    // step 5. save in blog
    await oneBlog.save();

    // step 6. return the response of like after to create it
    res.status(201).json({ status: "201", message: "Created", Like: newLike });
  } catch (error) {
    res.status(500).json({ status: "500", error: "Internal server Error" });
  }
};

export { getAllLikes, createLike };
