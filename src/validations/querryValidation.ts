// step 1. import joi
import Joi from "joi";

// step 2. create joi schema
const querrySchema = Joi.object({
  name: Joi.string().required().min(4).max(15),
  email: Joi.string().required().email(),
  message: Joi.string().required().min(8).max(400),
});

// step 3. create function for validating
const querryValid = (querryData: object) => {
  return querrySchema.validate(querryData);
};

export default querryValid;
