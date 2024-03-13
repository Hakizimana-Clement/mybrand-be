const Joi = require("joi");

// blog schema to validate
const blogSchema = Joi.object({
  title: Joi.string().required(),
  writer: Joi.string().required(),
  writeImage: Joi.string(),
  blogImage: Joi.string().required(),
  content: Joi.string().required(),
});

// validate data we have
const validateBlog = async (blogData) => {
  return blogSchema.validate(blogData);
};

module.exports = validateBlog;
