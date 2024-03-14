import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    writer: { type: String, required: true },
    writeImage: { type: String },
    // blogImage: { type: String, required: true },
    blogImage: { type: String },
    content: { type: String, required: true },
    comments: [],
    likes: [],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
