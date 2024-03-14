// step 1. import joi
import Joi from "joi";

// step 2. import model schema to work on
const commentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  comment: Joi.string().required(),
});

// step 3.validate function
const commentValid = (commentData: object) => {
  return commentSchema.validate(commentData);
};

export default commentValid;
