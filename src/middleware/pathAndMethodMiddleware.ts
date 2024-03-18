import { Request, Response, NextFunction } from "express";

// show path and method coming in server
const pathAndMethodMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.path, req.method);
  next();
};

export default pathAndMethodMiddleware;
