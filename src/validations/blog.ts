import Joi from "joi";
// blog schema to validate
const blogSchema = Joi.object({
  title: Joi.string().required().min(10).max(100),
  writer: Joi.string().required().min(5).max(10),
  writeImage: Joi.string(),
  blogImage: Joi.string().required(),
  content: Joi.string().min(100).max(5000),
});

// validate data we have
const validateBlog = async (blogData: object) => {
  return blogSchema.validate(blogData);
};

export default validateBlog;
