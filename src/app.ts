import express, { NextFunction, Request, Response } from "express";
const app = express();
// routes
import apiRoutes from "./routes";

app.use(express.json());

// middleware
// show path and method coming in server
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/v1/", apiRoutes);
app.use("/api/v1/", (req: Request, res: Response) =>
  res.status(200).json({ message: "Welcome to Blog API" })
);

// module.exports = app;
export { app };
