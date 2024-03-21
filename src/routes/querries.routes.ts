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
  // get all comment
  .get("/", isAdmin, httpGetAllQuerries)
  // Create comment
  // .post("/", isAdmin, isQuerryValid, httpCreateQuery)
  .post("/", isQuerryValid, httpCreateQuery)
  // delete comment
  .delete("/:id", isAdmin, httpDeleteQuery);

export default querriesRouter;
