import Joi from "joi";

const updateBlogSchema = Joi.object({
  title: Joi.string().min(10).max(100),
  writer: Joi.string().min(5).max(40),
  writeImage: Joi.string(),
  blogImage: Joi.string(),
  content: Joi.string().min(100).max(5000),
  role: Joi.string().required(),
});

const validateUpdateBlog = (blogData: object) => {
  return updateBlogSchema.validate(blogData);
};

export default validateUpdateBlog;
