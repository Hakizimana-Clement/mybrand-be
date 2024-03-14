import express, { Request, Response } from "express";
const likesRouter = express.Router();
// import like controllers
import { createLike, getAllLikes } from "../controllers/like.controllers";

likesRouter
  // get all likes
  .get("/:id/likes", getAllLikes)
  // create like
  .post("/:id/likes", createLike);

export default likesRouter;
