import express, { Request, Response } from "express";
const querriesRouter = express.Router();
import {
  httpGetAllQuerries,
  httpCreateQuery,
  httpDeleteQuery,
} from "../controllers/query.controllers";
import isQuerryValid from "../middleware/querryMiddleware";
import authCheck from "../middleware/authCheck";

querriesRouter
  // get all comment
  .get("/", authCheck(["user", "admin"]), httpGetAllQuerries)
  // Create comment
  .post("/", isQuerryValid, httpCreateQuery)
  // delete comment
  .delete("/:id", authCheck(["user", "admin"]), httpDeleteQuery);

export default querriesRouter;
