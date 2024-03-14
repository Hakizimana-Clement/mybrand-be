// step 1. import joi
import Joi from "joi";

// step 2. import model schema to work on
const commentSchema = Joi.object({
  name: Joi.string().required().min(4).max(10),
  email: Joi.string().required().email(),
  comment: Joi.string().required().max(500),
});

// step 3.validate function
const commentValid = (commentData: object) => {
  return commentSchema.validate(commentData);
};

export default commentValid;
