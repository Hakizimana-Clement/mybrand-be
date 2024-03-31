// import express from "express";
// const authRouter = express.Router();
// // import user controller
// import { loginUser, signupUser } from "../controllers/user.controller";
// import isSignupValid from "../middleware/signupMiddleware";

// authRouter
//   // login
//   // .post("/login", isLoginValid, loginUser)
//   .post("/login", loginUser)
//   // singup
//   /**
//    * @openapi
//    * /api/v1/user/signup:
//    * post:
//    *  tags:
//    *    - User
//    * summary: Register a user
//    * requestBody:
//    *  required: true
//    *  contents:
//    *    application/json:
//    *      schema:
//    *
//    * */
//   .post("/signup", isSignupValid, signupUser);

// export default authRouter;
import isLoginValid from "../middleware/loginMiddleware";
import express from "express";
const authRouter = express.Router();

// Import user controller
import { loginUser, signupUser } from "../controllers/user.controller";
import isSignupValid from "../middleware/signupMiddleware";

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Operations related to user authentication
 */

/**
 * @openapi
 * /api/v1/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirm password:
 *                 type: string
 *             example:
 *               name: Kalisa mucyo
 *               email: mucyo@example.com
 *               password: 123John!
 *               confirm password: 123John!
 *     responses:
 *       201:
 *         description: User signup successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email already in use
 */
authRouter.post("/signup", isSignupValid, signupUser);
/**
 * @openapi
 * /api/v1/users/login:
 *   post:
 *     summary: Authenticate user and generate access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: mucyo@example.com
 *               password: 123John!
 *     responses:
 *       200:
 *         description: Login successful, returns access token

 *       400:
 *         description: Bad request
*       401:
 *         description: Unauthorized, wrong credentials
 */
authRouter.post("/login", isLoginValid, loginUser);

export default authRouter;
