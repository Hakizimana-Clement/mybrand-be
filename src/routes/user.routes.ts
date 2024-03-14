import express from "express";
const authRouter = express.Router();
// import user controller
import { loginUser, signupUser } from "../controllers/user.controller";
import isSignupValid from "../middleware/signupMiddleware";

authRouter
  // login
  .post("/login", loginUser)
  // singup
  .post("/signup", isSignupValid, signupUser);

export default authRouter;
