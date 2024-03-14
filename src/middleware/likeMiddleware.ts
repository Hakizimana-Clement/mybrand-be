// step 1. import neccessary express
import { Request, Response, NextFunction } from "express";

// step 2. import validation we create
import likeValid from "../validations/likeValidation";

const isLikeValid = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = likeValid(req.body);
  console.log(validationResult.value);

  try {
    // step 3. check if result is empty
    if (Object.keys(validationResult.value).length === 0) {
      return res.status(400).json({ error: "Please fill like value" });
    }

    // step 4. check if there error occur
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /["\"]/g,
        ""
      );

      return res.status(400).json({ error: errorMessage });
    }

    // step 5. move to next functions
    next();
  } catch (error) {
    console.log("error ", error);
    res.status(400).json({ error: error });
  }
};

export default isLikeValid;
