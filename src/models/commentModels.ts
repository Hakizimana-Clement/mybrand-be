import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    // email: {
    //   type: String,
    //   required: true,
    // },
    comment: {
      type: String,
      required: true,
    },

    blog_id: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
