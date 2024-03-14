// step 1. import neccessary express function
import { NextFunction, Request, Response } from "express";

// step 2. import signup valid
import signupValid from "../validations/signupValidation";

const isSignupValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = await signupValid(req.body);

  try {
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /["\"]/g,
        ""
      );
      return res.status(400).json({ error: errorMessage });
    }
    next();
  } catch (error) {
    console.log("error: ", error);
  }
};

export default isSignupValid;
