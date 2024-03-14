// step 1. import joi
import Joi from "joi";

// step 2. create joi schema for validation
const likeSchema = Joi.object({
  like: Joi.boolean().required(),
});

// step 3. function to validate
const likeValid = (likeData: object) => {
  return likeSchema.validate(likeData);
};

export default likeValid;
