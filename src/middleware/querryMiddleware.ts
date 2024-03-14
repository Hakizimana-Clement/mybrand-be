// step 1. import neccessary express function
import { Request, Response, NextFunction } from "express";
// step 2. import validation for querry
import querryValid from "../validations/querryValidation";

const isQuerryValid = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = querryValid(req.body);

  try {
    // step 3. if we have error
    if (validationResult.error) {
      const errorMessage = validationResult.error.details[0].message.replace(
        /["\"]/g,
        ""
      );

      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    // step 4. move to the next function
    next();
  } catch (error) {
    console.log("error ", error);
  }
};

export default isQuerryValid;
