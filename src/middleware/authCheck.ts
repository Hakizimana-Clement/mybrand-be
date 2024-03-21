import { Request, Response, NextFunction } from "express";
import { IUserRequest } from "../interfaces";
import { JwtUtils } from "../utils/jwt.util";
import UserModel from "../models/userModels";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.header("Authorization"))
      return res.status(401).json({ message: "please login" });

    interface CustomRequest extends Request {
      user?: IUserRequest;
    }
    const token = req.header("Authorization")?.split(" ")[1] as string;
    const userDetail = await JwtUtils.verifyToken(token);
    const userExist = await UserModel.findOne({ _id: userDetail._id });
    console.log("***###########*********", token);

    if (!userExist) return res.status(401).json({ message: "User not found" });
    const userData = {
      _id: userExist?._id,
      email: userExist?.email,
    };

    (req as CustomRequest).user = userData;
    if (userDetail.role !== "admin") {
      return res
        .status(406)
        .json({ message: "Only admin can perform this action" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "No valid credential" });
  }
};

const isLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.header("Authorization"))
      return res.status(401).json({ message: "please login" });

    interface CustomRequest extends Request {
      user?: IUserRequest;
    }
    const token = req.header("Authorization")?.split(" ")[1] as string;
    const userDetail = await JwtUtils.verifyToken(token);
    const userExist = await UserModel.findOne({ _id: userDetail._id });
    // console.log("***###########*********", token);

    if (!userExist) return res.status(401).json({ message: "User not found" });
    const userData = {
      _id: userExist?._id,
      email: userExist?.email,
    };

    (req as CustomRequest).user = userData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "No valid credential" });
  }
};

export { isAdmin, isLogin };
