import mongoose from "mongoose";

const Schema = mongoose.Schema;

const QuerySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Query", QuerySchema);
