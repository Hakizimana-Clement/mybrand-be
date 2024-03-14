// step 0. import neccessary express
import { Request, Response, NextFunction } from "express";
// step 1. import model to work on
import commentModels from "../models/commentModels";
// step 2. import validation
import commentValid from "../validations/comment";
import { object } from "joi";

const isCommentValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // step 3. validate income req to server
    const validationResult = commentValid(req.body);

    // step 4. check if its empty
    if (Object.keys(validationResult.value).length === 0) {
      return res
        .status(400)
        .json({ error: "Please fill all fieds to create comments" });
    }

    // step 5. check if there error
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /["\"]/g,
        ""
      );
      console.log(errorMessage);
      return res.status(400).json(errorMessage);
    }

    // step 6. move to other function
    next();
  } catch (error) {
    console.log({ error: error });
    res.status(400).json({ error: error });
  }
};

export default isCommentValid;
