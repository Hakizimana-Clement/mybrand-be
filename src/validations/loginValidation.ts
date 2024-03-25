// step 1. import joi
import Joi from "joi";

// step 2. create login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// step 3. create valid function
const loginValid = (loginData: object) => {
  return loginSchema.validate(loginData);
};

export default loginValid;
