import mongoose from "mongoose";

const Schema = mongoose.Schema;

// title: { type: String, required: true },
const blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    writer: { type: String, required: true },
    writeImage: { type: String },
    blogImage: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
