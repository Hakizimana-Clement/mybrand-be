// // import express and router
// import express, { Request, Response } from "express";
// const blogRouter = express.Router();

// // import blogs controller
// import {
//   httpGetAllBlogs,
//   httpCreateBlog,
//   httpGetSingleBlog,
//   httpUpdateBlog,
//   httpDeleteBlog,
// } from "../controllers/blog.controllers";

// import like
import { getAllLikes, createLike } from "../controllers/like.controllers";
// import comment
import {
  createComment,
  getAllComments,
} from "../controllers/comment.controllers";
// //////////// validation //////////////

// import { isDeleteValid, isValid } from "../middleware/blogMiddleware";
// import isUpdateValid from "../middleware/blogUpdateMiddleware";
import isCommentValid from "../middleware/commentMiddleware";
// // import { isAdminNow, isLoggedInNow } from "../middleware/authenticationMiddleware";
import { isAdmin, isLogin } from "../middleware/authCheck";
// // middleware
import uploadImageMiddleware from "../middleware/multerMiddleware";
// // import uploadImage from "../utils/uploadImage";

// ////////////////////////////// BLOGS ROUTES /////////////////////////////////////

// // // Get all blogs
// // blogRouter

// //   /**
// //    * @openapi
// //    * /api/v1/blogs:
// //    *  get:
// //    *     tags:
// //    *     - Blogs
// //    *     description: Retrieve a list of all blogs.
// //    *     responses:
// //    *       200:
// //    *         description: A list of blogs.
// //    */
// //   .get("/", httpGetAllBlogs)
// //   // Create blog
// //   // .post("/", httpCreateBlog)
// //   // .post("/", isAdmin, upload.single("blogImage"), httpCreateBlog)
// //   /**
// //    * @openapi
// //    * '/api/blogs':
// //    *  post:
// //    *     tags:
// //    *     - Blogs
// //    *     summary: Create a new product
// //    *     requestBody:
// //    *       required: true
// //    *       content:
// //    *         application/json:
// //    *           schema:
// //    *             $ref: '#/components/schema/Product'
// //    *     responses:
// //    *       200:
// //    *         description: Product created
// //    *         content:
// //    *          application/json:
// //    *           schema:
// //    *              $ref: '#/components/schema/productResponse'
// //    *           example:
// //    *             "user": "642a0de05f16e6dad68efdad"
// //    *             "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens"
// //    *             "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
// //    *             "price": 879.99
// //    *             "image": "https://i.imgur.com/QlRphfQ.jpg"
// //    *             "_id": "642a1cfcc1bec76d8a2e7ac2"
// //    *             "productId": "product_xxqm8z3eho"
// //    *             "createdAt": "2023-04-03T00:25:32.189Z"
// //    *             "updatedAt": "2023-04-03T00:25:32.189Z"
// //    *             "__v": 0
// //    */
// //   .post("/", isAdmin, isValid, upload.single("blogImage"), httpCreateBlog)

// //   // .post("/", isAdmin, isValid, httpCreateBlog)

// // Get all blogs
// blogRouter
//   /**
//    * @openapi
//    * /api/v1/blogs:
//    *   get:
//    *     tags:
//    *       - Blogs
//    *     summary: Retrieve a list of all blogs.
//    *     description: Get a list of all blogs.
//    *     responses:
//    *       '200':
//    *         description: A list of blogs.
//    */
//   .get("/", httpGetAllBlogs)
//   /**
//    * @openapi
//    * /api/v1/blogs:
//    *   post:
//    *     tags:
//    *       - Blogs
//    *     summary: Create a new blog.
//    *     description: Create a new blog entry.
//    *     requestBody:
//    *       required: true
//    *       content:
//    *         application/json:
//    *           schema:
//    *             $ref: '#/components/schema/blog'
//    *     responses:
//    *       '200':
//    *         description: Blog created successfully.
//    *         content:
//    *           application/json:
//    *             schema:
//    *               $ref: '#/components/models/CreateBlogInputi'
//    *             example:
//    *               userToken: "sjakfsjf0ikfsfskdfjskdjfksdfjskdfjasdfsdff"
//    *               title: "Did you Canon EOS 1500D DSLR Camera have 18-55mm Lens??"
//    *               writer: "morgan adam"
//    *               blog image: "www.unsplash.com"
//    *               content: "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy-to-use automatic shooting modes, a large 24.1 MP sensor, Canon Camera Connect app integration, and a built-in feature guide, the EOS 1500D is always ready to go."
//    *               createdAt: "2023-04-03T00:25:32.189Z"
//    *               updatedAt: "2023-04-03T00:25:32.189Z"
//    *               __v: 0
//    */
//   // .post("/", isAdmin, isValid, httpCreateBlog)
//   // .post("/", isValid, httpCreateBlog)
//   .post("/", isAdmin, uploadImageMiddleware.single("blogImage"), httpCreateBlog)
//   // .post("/", isAdmin, isValid, upload.single("blogImage"), httpCreateBlog)
//   // .post("/", isAdmin, upload.single("blogImage"), httpCreateBlog)
//   // .post("/", isAdmin, httpCreateBlog)
//   // .post("/", isAdmin, (req: Request, res: Response) => {
//   //   res.json({ mssg: "working" });
//   // })

//   // Get individual blog
//   .get("/:id", httpGetSingleBlog)
//   // Update blog
//   .patch("/:id", isAdmin, httpUpdateBlog)
//   // .patch("/:id", isAdmin, isUpdateValid, httpUpdateBlog)
//   // .patch("/:id", isAdminNow, httpUpdateBlog)
//   // Delete blog
//   .delete("/:id", isAdmin, httpDeleteBlog)

//   ////////////////////////////// COMMENT ROUTES /////////////////////////////////////
//   // get all comment
//   .get("/:id/comments", isAdmin, getAllComments)

//   // Create comment
//   .post("/:id/comments", isAdmin, isCommentValid, createComment)

//   ////////////////////////////// LIKE ROUTES /////////////////////////////////////

//   // get all likes
//   .get("/:id/likes", isLogin, isAdmin, getAllLikes)
//   // .get("/:id/likes", isAdmin, getAllLikes)
//   // .get("/:id/likes", getAllLikes)
//   // create like
//   .post("/:id/likes", isLogin, isAdmin, createLike);
// // .post("/:id/likes", isAdmin, createLike);

// // export all routers
// export default blogRouter;
import express, { Request, Response } from "express";
const blogRouter = express.Router();

// Import controllers
import {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
} from "../controllers/blog.controllers";

blogRouter
  /**
   * @swagger
   * tags:
   *   name: Blogs
   *   description: API endpoints for managing blogs
   */

  /**
   * @swagger
   * /api/v1/blogs:
   *   get:
   *     summary: Get all blogs
   *     tags: [Blogs]
   *     responses:
   *       '200':
   *         description: A list of blogs
   */
  .get("/", httpGetAllBlogs)

  /**
   * @swagger
   * /api/v1/blogs:
   *   post:
   *     summary: Create a new blog
   *     tags: [Blogs]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               writer:
   *                 type: string
   *               blogImage:
   *                 type: string
   *               content:
   *                 type: string
   *             example:
   *               title: The Enchanting Journey to the Whispering Wood
   *               writer: Lily Evergreen
   *               blogImage: https://res.cloudinary.com/dtimmf97z/image/upload/v1711404157/uoyj6ycojj3utewmsepd.jpg
   *               content: Introduction The sun dipped below the horizon, casting a warm glow over the ancient trees. The Whispering Woods, shrouded in mystery, beckoned to those who dared to venture beyond the well-trodden path. I, too, succumbed to its allure, my heart pounding with anticipation.
   *     responses:
   *       '201':
   *         description: Blog created successfully
   *       '400':
   *         description: Bad request, missing or invalid parameters
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid
   *       '500':
   *         description: Internal server error
   */

  // .post("/", isAdmin, uploadImageMiddleware.single("blogImage"), httpCreateBlog)
  .post("/", uploadImageMiddleware.single("blogImage"), httpCreateBlog)
  /**
   * @swagger
   * /api/v1/blogs/{id}:
   *   get:
   *     summary: Get a blog by ID
   *     tags: [Blogs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the blog to get
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: A single blog
   *       '404':
   *         description: Blog not found
   */
  .get("/:id", httpGetSingleBlog)

  /**
   * @swagger
   * /api/v1/blogs/{id}:
   *   patch:
   *     summary: Update a blog by ID
   *     tags: [Blogs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the blog to update
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               writer:
   *                 type: string
   *               writeImage:
   *                 type: string
   *               blogImage:
   *                 type: string
   *               content:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Blog updated successfully
   *       '404':
   *         description: Blog not found
   */
  // .patch("/:id", isAdmin, httpUpdateBlog)
  .patch("/:id", httpUpdateBlog)

  /**
   * @swagger
   * /api/v1/blogs/{id}:
   *   delete:
   *     summary: Delete a blog by ID
   *     tags: [Blogs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the blog to delete
   *         schema:
   *           type: string
   *     responses:
   *       '204':
   *         description: Blog deleted successfully
   *       '404':
   *         description: Blog not found
   */
  // .delete("/:id", isAdmin, httpDeleteBlog);
  .delete("/:id", httpDeleteBlog)

  ////////////////////////////// COMMENT ROUTES /////////////////////////////////////
  /**
   * @swagger
   * tags:
   *   name: Comments
   *   description: API endpoints for managing comments on blog posts
   */

  /**
   * @swagger
   * /api/v1/blogs/{blogId}/comments:
   *   get:
   *     summary: Get all comments for a specific blog post
   *     tags: [Comments]
   *     parameters:
   *       - in: path
   *         name: blogId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the blog post
   *     responses:
   *       '200':
   *         description: A list of comments for the specified blog post
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: "200"
   *                 message:
   *                   type: string
   *                   example: "Success"
   *                 comments:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Comment'
   *       '404':
   *         description: Blog post not found or no comments found
   *         content:
   *           application/json:
   *             schema:
  //  *               $ref: '#/components/schemas/Error'
   */

  // get all comment
  // .get("/:id/comments", isAdmin, getAllComments)
  .get("/:id/comments", getAllComments)

  /**
   * @swagger
   * /api/v1/blogs/{blogId}/comments:
   *   post:
   *     summary: Create a new comment for a specific blog post
   *     tags: [Comments]
   *     parameters:
   *       - in: path
   *         name: blogId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the blog post
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '##/components/schemas/NewComment'
   *     responses:
   *       '201':
   *         description: Comment created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: "201"
   *                 message:
   *                   type: string
   *                   example: "Created"
   *                 comment:
   *                   $ref: '##/components/schemas/Comment'
   *       '400':
   *         description: Bad request or validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '##/components/schemas/Error'
   *
   *       '401':
   *         description: Unauthorized, authentication token is missing
   *       '404':
   *         description: Blog post not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '##/components/schemas/Error'
   */
  // Create comment
  // .post("/:id/comments", isAdmin, isCommentValid, createComment);
  .post("/:id/comments", isCommentValid, createComment)

  //   ////////////////////////////// LIKE ROUTES /////////////////////////////////////
  // Get all likes for a specific blog
  /**
   * @swagger
   * /api/v1/blogs/{id}/likes:
   *   get:
   *     summary: Get all likes for a specific blog
   *     description: Retrieve all likes associated with a specific blog.
   *     tags: [Likes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the blog to get likes for
   *     responses:
   *       '200':
   *         description: A list of likes for the specified blog
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                 message:
   *                   type: string
   *                 likes:
   *                   type: array
   *                   items:
   *                     $ref: '##/components/schemas/Like'
   *       '404':
   *         description: Blog not found
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                 error:
   *                   type: string
   */
  // get all likes
  // .get("/:id/likes", isLogin, isAdmin, getAllLikes)
  .get("/:id/likes", getAllLikes)
  // .get("/:id/likes", isAdmin, getAllLikes)
  // .get("/:id/likes", getAllLikes)

  // Create a like for a specific blog
  /**
   * @swagger
   * /api/v1/blogs/{id}/likes:
   *   post:
   *     summary: Create a like for a specific blog
   *     description: Create a like for a specific blog by providing the blog ID.
   *     tags: [Likes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the blog to create a like for
   *     responses:
   *       '201':
   *         description: Like created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                 message:
   *                   type: string
   *       '400':
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                 error:
   *                   type: string
   */

  // create like
  // .post("/:id/likes", isLogin, isAdmin, createLike);
  .post("/:id/likes", createLike);
// .post("/:id/likes", isAdmin, createLike);

export default blogRouter;
