const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  writer: String,
  writeImage: String,
  blogImage: String,
  content: String,
});

module.exports = mongoose.model("Blog", blogSchema);
