import Joi from "joi";
// blog schema to validate
const blogSchema = Joi.object({
  role: Joi.string(),
  title: Joi.string().required().min(5).max(100),
  writer: Joi.string().required().min(5).max(50),
  blogImage: Joi.string().required(),
  // content: Joi.string().required().min(100).max(5000),
  content: Joi.string().required().min(10).max(5000),
  writeImage: Joi.string(),
});

// validate data we have
const validateBlog = async (blogData: object) => {
  return blogSchema.validate(blogData);
};

// validate delete schema
const deleteSchema = Joi.object({
  role: Joi.string(),
});

const deleteValidateBlog = async (blogData: object) => {
  return deleteSchema.validate(blogData);
};

export { validateBlog, deleteValidateBlog };
