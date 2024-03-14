// step 1. import joi
import Joi from "joi";

// step2. create signup schema for signup
const signupSchema = Joi.object({
  name: Joi.string().required().min(4).max(10),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(10),
});

// step 3. create function for validation
const signupValid = (signupData: object) => {
  return signupSchema.validate(signupData);
};

export default signupValid;
