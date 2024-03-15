// step 1. import joi
import Joi from "joi";

// step2. create signup schema for signup
const signupSchema = Joi.object({
  name: Joi.string().required().min(4).max(30),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    .min(8)
    .max(10)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"))
    .messages({
      "string.pattern.base":
        "Password must contain at least one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long",
    }),
});
// step 3. create function for validation
const signupValid = (signupData: object) => {
  return signupSchema.validate(signupData);
};

export default signupValid;
