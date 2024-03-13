const validateBlog = require("../validations/blog");

const blogModel = require("../models/blogModel");
const isValid = async (req, res, next) => {
  const { error } = validateBlog(req.body);

  if (error) {
    const errorMessage = error.details[0].message.replace(/["\\]/g, "");
    console.error("error: ", errorMessage);
    return res.status(400).json(errorMessage);
  }

  // check if title is unique
  const existingBlog = await blogModel.findOne({ title: req.body.title });

  if (existingBlog) {
    return res.status(400).json({ error: "Title must be unique" });
  }
  try {
    next();
  } catch (error) {
    console.error("Error ", error);
  }
};

module.exports = isValid;
