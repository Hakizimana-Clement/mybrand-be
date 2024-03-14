// step 1. import neccessary express
import { Request, Response, NextFunction } from "express";
// step 2. import validation
import commentValid from "../validations/comment";

const isCommentValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // step 3. validate income req to server
    const validationResult = commentValid(req.body);

    // step 4. check if there error
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /["\"]/g,
        ""
      );
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    // step 5. move to other function
    next();
  } catch (error) {
    console.log("Error ", error);
    // res.status(400).json({ "Error ": error });
  }
};

export default isCommentValid;
