// import express and router
import express from "express";
const blogRouter = express.Router();

// import blogs controller
import {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
} from "../controllers/blog.controllers";

// import like
import { getAllLikes, createLike } from "../controllers/like.controllers";
// import comment
import {
  createComment,
  getAllComments,
} from "../controllers/comment.controllers";

//////////// validation //////////////
import { isDeleteValid, isValid } from "../middleware/blogMiddleware";
import isUpdateValid from "../middleware/blogUpdateMiddleware";
import isCommentValid from "../middleware/commentMiddleware";
// import { isAdminNow, isLoggedInNow } from "../middleware/authenticationMiddleware";
import { isAdmin, isLogin } from "../middleware/authCheck";
// middleware
import upload from "../middleware/multerMiddleware";
// import upload from "../models/blogModels";

////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// // Get all blogs
// blogRouter

//   /**
//    * @openapi
//    * /api/v1/blogs:
//    *  get:
//    *     tags:
//    *     - Blogs
//    *     description: Retrieve a list of all blogs.
//    *     responses:
//    *       200:
//    *         description: A list of blogs.
//    */
//   .get("/", httpGetAllBlogs)
//   // Create blog
//   // .post("/", httpCreateBlog)
//   // .post("/", isAdmin, upload.single("blogImage"), httpCreateBlog)
//   /**
//    * @openapi
//    * '/api/blogs':
//    *  post:
//    *     tags:
//    *     - Blogs
//    *     summary: Create a new product
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         application/json:
//    *           schema:
//    *             $ref: '#/components/schema/Product'
//    *     responses:
//    *       200:
//    *         description: Product created
//    *         content:
//    *          application/json:
//    *           schema:
//    *              $ref: '#/components/schema/productResponse'
//    *           example:
//    *             "user": "642a0de05f16e6dad68efdad"
//    *             "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens"
//    *             "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
//    *             "price": 879.99
//    *             "image": "https://i.imgur.com/QlRphfQ.jpg"
//    *             "_id": "642a1cfcc1bec76d8a2e7ac2"
//    *             "productId": "product_xxqm8z3eho"
//    *             "createdAt": "2023-04-03T00:25:32.189Z"
//    *             "updatedAt": "2023-04-03T00:25:32.189Z"
//    *             "__v": 0
//    */
//   .post("/", isAdmin, isValid, upload.single("blogImage"), httpCreateBlog)

//   // .post("/", isAdmin, isValid, httpCreateBlog)

// Get all blogs
blogRouter
  /**
   * @openapi
   * /api/v1/blogs:
   *   get:
   *     tags:
   *       - Blogs
   *     summary: Retrieve a list of all blogs.
   *     description: Get a list of all blogs.
   *     responses:
   *       '200':
   *         description: A list of blogs.
   */
  .get("/", httpGetAllBlogs)
  /**
   * @openapi
   * /api/v1/blogs:
   *   post:
   *     tags:
   *       - Blogs
   *     summary: Create a new blog.
   *     description: Create a new blog entry.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/blog'
   *     responses:
   *       '200':
   *         description: Blog created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/models/CreateBlogInputi'
   *             example:
   *               userToken: "sjakfsjf0ikfsfskdfjskdjfksdfjskdfjasdfsdff"
   *               title: "Did you Canon EOS 1500D DSLR Camera have 18-55mm Lens??"
   *               writer: "morgan adam"
   *               blog image: "www.unsplash.com"
   *               content: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy-to-use automatic shooting modes, a large 24.1 MP sensor, Canon Camera Connect app integration, and a built-in feature guide, the EOS 1500D is always ready to go."
   *               createdAt: "2023-04-03T00:25:32.189Z"
   *               updatedAt: "2023-04-03T00:25:32.189Z"
   *               __v: 0
   */
  .post("/", isAdmin, isValid, upload.single("blogImage"), httpCreateBlog)

  // Get individual blog
  .get("/:id", httpGetSingleBlog)
  // Update blog
  .patch("/:id", isAdmin, httpUpdateBlog)
  // .patch("/:id", isAdmin, isUpdateValid, httpUpdateBlog)
  // .patch("/:id", isAdminNow, httpUpdateBlog)
  // Delete blog
  .delete("/:id", isAdmin, httpDeleteBlog)

  ////////////////////////////// COMMENT ROUTES /////////////////////////////////////
  // get all comment
  .get("/:id/comments", isLogin, isAdmin, getAllComments)

  // Create comment
  .post("/:id/comments", isLogin, isAdmin, isCommentValid, createComment)

  ////////////////////////////// LIKE ROUTES /////////////////////////////////////

  // get all likes
  // .get("/:id/likes", isLogin, isAdmin, getAllLikes)
  .get("/:id/likes", isAdmin, getAllLikes)
  // .get("/:id/likes", getAllLikes)
  // create like
  // .post("/:id/likes", isLogin, isAdmin, createLike);
  .post("/:id/likes", isAdmin, createLike);

// export all routers
export default blogRouter;
