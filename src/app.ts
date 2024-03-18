import express, { Request, Response } from "express";
// middleware
import pathAndMethodMiddleware from "./middleware/pathAndMethodMiddleware";
const app = express();
// routes
import apiRoutes from "./routes";

app.use(express.json());

app.use("/api/v1/", pathAndMethodMiddleware, apiRoutes);
app.use("/api/v1/", pathAndMethodMiddleware, (req: Request, res: Response) =>
  res.status(200).json({ message: "Welcome to Blog API" })
);

export { app };
