import express from "express";
const authRouter = express.Router();
// import user controller
import { loginUser, signupUser } from "../controllers/user.controller";
import isSignupValid from "../middleware/signupMiddleware";
import isLoginValid from "../middleware/loginMiddleware";

authRouter
  // login
  // .post("/login", isLoginValid, loginUser)
  .post("/login", loginUser)
  // singup
  /**
   * @openapi
   * /api/v1/user/signup:
   * post:
   *  tags:
   *    - User
   * summary: Register a user
   * requestBody:
   *  required: true
   *  contents:
   *    application/json:
   *      schema:
   *
   * */
  .post("/signup", isSignupValid, signupUser);

export default authRouter;
