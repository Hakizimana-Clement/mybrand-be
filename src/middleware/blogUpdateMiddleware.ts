import { Request, Response, NextFunction } from "express";
import validateUpdateBlog from "../validations/blogUpdate";

///////////////////// validte update blog ////////////////
const isUpdateValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = validateUpdateBlog(req.body);
  // console.log(validationResult.value);

  // check if user send empty data
  if (Object.keys(validationResult.value).length === 0) {
    return res.status(400).json({ error: "Please fill fields to update" });
  }

  // check and validation error
  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message.replace(
      /["\\"]/g,
      ""
    );

    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    next();
  } catch (error) {
    console.error("Error ", error);
  }
};
export default isUpdateValid;
