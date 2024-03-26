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
   *     security:
   *     - bearerAuth: []
   */

  .get("/", isAdmin, httpGetAllQuerries)
  // .get("/", httpGetAllQuerries)

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
   *               name: iradukunda
   *               email: iradukunda@email.com
   *               message: I have project idea
   *     responses:
   *       '201':
   *         description: Queries created successfully
   *       '400':
   *         description: Bad request
   *       '500':
   *         description: Internal server error
   */

  // .post("/",  httpCreateQuery)
  .post("/", isQuerryValid, httpCreateQuery)

  /**
   * @swagger
   * /api/v1/queries/{id}:
   *   delete:
   *     summary: Delete a queries by ID
   *     tags: [Queries]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the querry to delete
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Query deleted successfully
   *       '401':
   *         description: Unauthorized, authentication token is missing
   *       '404':
   *         description: Query not found
   *     security:
   *     - bearerAuth: []
   */

  // delete queries
  .delete("/:id", isAdmin, httpDeleteQuery);
// .delete("/:id", httpDeleteQuery);

export default querriesRouter;
