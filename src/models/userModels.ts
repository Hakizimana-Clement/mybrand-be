import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  // confirmPassword: {
  //   type: String,
  //   required: true,
  // },
  role: {
    type: String,
    default: "user",
  },
});

export default model("User", userSchema);
