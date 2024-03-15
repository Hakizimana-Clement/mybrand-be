import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likesSchema = new Schema(
  {
    like: { type: Boolean, required: true, default: false },
    blog_id: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Like", likesSchema);
