// step 1. import login valid function
import loginValid from "../validations/loginValidation";
// step 2. import express request,response and next function
import { NextFunction, Request, Response } from "express";

const isLoginValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = loginValid(req.body);

  if (validationResult.error) {
    const errorMessage = validationResult.error.details[0].message.replace(
      /["\"]/g,
      ""
    );

    return res
      .status(404)
      .json({ status: "404", message: "Not Found", error: errorMessage });
  }

  try {
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isLoginValid;
