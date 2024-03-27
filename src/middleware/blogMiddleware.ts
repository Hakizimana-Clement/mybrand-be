import { NextFunction, Request, Response } from "express";
import { validateBlog } from "../validations/blog";
import blogModels from "../models/blogModels";

const isValid = async (req: Request, res: Response, next: NextFunction) => {
  const validationResult = await validateBlog(req.body);

  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message.replace(
      /["\\]/g,
      ""
    );

    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  // check if title is unique
  const existingBlog = await blogModels.findOne({ title: req.body.title });

  if (existingBlog) {
    return res.status(400).json({ error: "Title must be unique" });
  }
  try {
    next();
  } catch (error) {
    console.error("Error ", error);
  }
};
export { isValid };
