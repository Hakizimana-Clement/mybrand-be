import express, { Request, Response } from "express";
const querriesRouter = express.Router();
import {
  httpGetAllQuerries,
  httpCreateQuery,
  httpDeleteQuery,
} from "../controllers/query.controllers";
import isQuerryValid from "../middleware/querryMiddleware";
// import { isAdmin } from "../middleware/authenticationMiddleware";
import { isAdmin, isLogin } from "../middleware/authCheck";

querriesRouter

  /**
   * @swagger
   * /api/v1/queries:
   *   get:
   *     summary: A list of queries
   *     tags: [Queries]
   *     responses:
   *       '200':
   *         description: A list of queries
   */

  // .get("/", isAdmin, httpGetAllQuerries)
  .get("/", httpGetAllQuerries)

  /**
   * @swagger
   * /api/v1/queries:
   *   post:
   *     summary: Create a new query
   *     tags: [Queries]
   *     security:
   *       - bearerAuth: []
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
   *               message:
   *                 type: string
   *             example:
   *               name: iraturokoye
   *               email: iraturokoye@email.com
   *               message: I have project idea to work on
   *     responses:
   *       '201':
   *         description: Queries created successfully
   *       '400':
   *         description: Bad request
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid
   *       '500':
   *         description: Internal server error
   */

  // .post("/",  httpCreateQuery)
  .post("/", isQuerryValid, httpCreateQuery)

  // delete comment
  .delete("/:id", isAdmin, httpDeleteQuery);

export default querriesRouter;
