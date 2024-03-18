import { NextFunction, Request, Response } from "express";

const authCheck = (permission: String | any[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body.role);
    // const { role } = req.body;
    // console.log("Role ", +role);
    // console.log("permission " + permission);
    // res.json("next");
    const userRole = req.body.role;
    console.log("Role: " + userRole);
    if (permission.includes(userRole)) {
      next();
    } else {
      res.status(401).json("You don't have permission!");
    }
  };
};

export default authCheck;
