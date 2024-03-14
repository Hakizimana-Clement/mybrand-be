import express, { Request, Response } from "express";
const querriesRouter = express.Router();
import {
  httpGetAllQuerries,
  httpCreateQuery,
  httpDeleteQuery,
} from "../controllers/query.controllers";

querriesRouter
  // get all comment
  .get("/", httpGetAllQuerries)
  // Create comment
  .post("/", httpCreateQuery)
  // delete comment
  .delete("/:id", httpDeleteQuery);

export default querriesRouter;
