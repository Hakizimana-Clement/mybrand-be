import Joi from "joi";

const updateBlogSchema = Joi.object({
  title: Joi.string(),
  writer: Joi.string(),
  writeImage: Joi.string(),
  blogImage: Joi.string(),
  content: Joi.string(),
});

const validateUpdateBlog = (blogData: object) => {
  return updateBlogSchema.validate(blogData);
};

export default validateUpdateBlog;
