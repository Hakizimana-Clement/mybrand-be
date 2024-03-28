import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likesSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blog_id: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likesSchema);
