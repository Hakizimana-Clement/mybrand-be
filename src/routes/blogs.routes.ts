// import like
import { getAllLikes, createLike } from "../controllers/like.controllers";
// import comment
import {
  createComment,
  getAllComments,
} from "../controllers/comment.controllers";

// //////////// validation //////////////
import isCommentValid from "../middleware/commentMiddleware";
import { isAdmin, isLogin } from "../middleware/authCheck";
// // middleware
import uploadImageMiddleware from "../middleware/multerMiddleware";
// export default blogRouter;
import express from "express";
const blogRouter = express.Router();

// Import controllers
import {
  httpGetAllBlogs,
  httpCreateBlog,
  httpGetSingleBlog,
  httpUpdateBlog,
  httpDeleteBlog,
} from "../controllers/blog.controllers";
import { isValid } from "../middleware/blogMiddleware";

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
   * @openapi
   * /api/v1/blogs:
   *   post:
   *     summary: Create a new blog
   *     tags: [Blogs]
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               writer:
   *                 type: string
   *               blogImage:
   *                 type: string
   *                 format: binary
   *               content:
   *                 type: string
   *     responses:
   *       '201':
   *         description: Blog created successfully
   *       401:
   *         description: Unauthorized, wrong credentials
   *       '404':
   *         description: Not found
   *       '400':
   *         description: Bad request
   */

  .post(
    "/",
    isAdmin,
    uploadImageMiddleware.single("blogImage"),
    isValid,
    httpCreateBlog
  )
  // .post("/", isAdmin, uploadImageMiddleware.single("blogImage"), httpCreateBlog)
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
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               writer:
   *                 type: string
   *               blogImage:
   *                 type: string
   *                 format: binary
   *               content:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Blog updated successfully
   *       '401':
   *         description: Unauthorized, authentication token is missing
   *       '400':
   *         description: Bad request
   *       '404':
   *         description: Blog not found
   *     security:
   *       - bearerAuth: []
   */
  .patch(
    "/:id",
    isAdmin,

    uploadImageMiddleware.single("blogImage"),
    httpUpdateBlog
  )
  // .patch("/:id", httpUpdateBlog)

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
   *       '200':
   *         description: Blog deleted successfully
   *       '404':
   *         description: Blog not found
   *     security:
   *       - bearerAuth: []
   */
  .delete("/:id", isAdmin, httpDeleteBlog)
  // .delete("/:id", httpDeleteBlog)

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
   *       '401':
   *         description: Unauthorized, authentication token is missing
   *       '404':
   *         description: Blog post not found
   *     security:
   *       - bearerAuth: []
   */

  // get all comment
  .get("/:id/comments", isAdmin, getAllComments)
  // .get("/:id/comments", getAllComments)
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
   *           example:
   *             comment: "I like this article so much"
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
   *
   *       '401':
   *         description: Unauthorized, authentication token is missing
   *       '404':
   *         description: Blog post not found
   *     security:
   *       - bearerAuth: []
   */

  // Create comment
  .post("/:id/comments", isAdmin, isCommentValid, createComment)
  // .post("/:id/comments", isCommentValid, createComment)

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
   *       401:
   *         description: Unauthorized, wrong credentials

   *       '404':
   *         description: Blog not found
   *     security:
   *       - bearerAuth: []
   */
  // get all likes
  .get("/:id/likes", isLogin, isAdmin, getAllLikes)
  // .get("/:id/likes", getAllLikes)
  // .get("/:id/likes", isAdmin, getAllLikes)
  // .get("/:id/likes", getAllLikes)

  // Create a like for a specific blog

  /**
   * @swagger
   * /api/v1/blogs/{blogId}/likes:
   *   post:
   *     summary: Create a like for a blog post
   *     tags: [Likes]
   *     parameters:
   *       - in: path
   *         name: blogId
   *         required: true
   *         description: ID of the blog post
   *         schema:
   *           type: string
   *     responses:
   *       201:
   *         description: Like created successfully
   *
   *       401:
   *         description: Unauthorized
   *       400:
   *         description: Bad request
   *     security:
   *       - bearerAuth: []
   */

  // create like
  .post("/:id/likes", isLogin, isAdmin, createLike);
// .post("/:id/likes", createLike);
// .post("/:id/likes", isAdmin, createLike);

export default blogRouter;
