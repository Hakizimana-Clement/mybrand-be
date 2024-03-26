import express, { Request, Response } from "express";
// middleware
import pathAndMethodMiddleware from "./middleware/pathAndMethodMiddleware";
const app = express();
// routes
import apiRoutes from "./routes";
import cors from "cors";

// const corsOptions = {
//   origin: "https://mybrand-be-j4ci.onrender.com/api/v1",
//   optionsSuccessStatus: 200,
// };

// app.use("/api/v1/", cors(corsOptions), pathAndMethodMiddleware, apiRoutes);
// app.use(
//   "/api/v1/",
//   cors(corsOptions),
//   pathAndMethodMiddleware,
//   (req: Request, res: Response) =>
//     res.status(200).json({ message: "Welcome to Blog API" })
// );
app.use(cors());
app.use(express.json());

app.use("/api/v1/", pathAndMethodMiddleware, apiRoutes);
app.use(
  "/api/v1/",

  pathAndMethodMiddleware,
  (req: Request, res: Response) =>
    res.status(200).json({ message: "Welcome to Blog API" })
);
export { app };
