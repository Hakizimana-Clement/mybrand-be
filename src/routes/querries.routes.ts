import express, { Request, Response } from "express";
const querriesRouter = express.Router();
import {
  httpGetAllQuerries,
  httpCreateQuery,
  httpDeleteQuery,
} from "../controllers/query.controllers";
import isQuerryValid from "../middleware/querryMiddleware";

querriesRouter
  // get all comment
  .get("/", httpGetAllQuerries)
  // Create comment
  .post("/", isQuerryValid, httpCreateQuery)
  // delete comment
  .delete("/:id", httpDeleteQuery);

export default querriesRouter;
