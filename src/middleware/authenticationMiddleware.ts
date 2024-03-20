import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModels";
// env
import dotenv from "dotenv";
import { JwtUtils } from "../utils/jwt.util";
dotenv.config();
// expand
interface ExpandRequest<T = Record<string, any>> extends Request {
  UserId?: JwtPayload;
}

// admin authentication
const isAdmin = async (req: ExpandRequest, res: Response, next: Function) => {
  try {
    if (!req.headers.authorization)
      return res.status(401).json({ message: "Please sign in" });

    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: "401", message: "Please login to continue" });
    }
    // const verfiyAccessToken = <T>(data: T) => {
    //   // jwt take two params: 1. verfity token verify and 2.secert pass key
    //   const secert = process.env.SECRET;
    //   return jwt.verify(String(data), secert as string);
    // };
    const userDetail = await JwtUtils.verifyToken(token);
    // console.log(verfiyAccessToken(token));
    // const decoded = verfiyAccessToken(token) as JwtPayload;
    // console.log(decoded);
    console.log("+++++++++++++++++++++++++++++", userDetail);
    // if (decoded) {
    //   // decoded have id and role
    //   req.UserId = decoded.user._id;
    //   const id = req.UserId;
    //   // console.log(id);
    //   const user = await userModels.findById(id);
    //   if (!user) {
    //     return res.status(404).json({ message: "User not found" });
    //   }
    //   if (user.role !== "admin") {
    //     return res
    //       .status(406)
    //       .json({ message: "Only admin can perform this action" });
    //   }
    const userExist = await userModel.findOne({ _id: userDetail._id });
    if (!userDetail) return res.status(401).json({ message: "User not found" });

    // const {} = userExist._
    const userData = {
      _id: userExist?._id,
      email: userExist?.email,
    };

    req.UserId = userData;
    if (userDetail.role !== "admin") {
      return res
        .status(406)
        .json({ message: "Only admin can perform this action" });
    }

    next();
  } catch (error) {
    console.error("Error: " + error);
    return res.status(400).json({ status: "400", message: "Bad request" });
  }
};

// log authentication
const isLoggedIn = async (
  req: ExpandRequest,
  res: Response,
  next: Function
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ status: "401", message: "Please login to continue" });
  }

  try {
    const verfiyAccessToken = <T>(data: T) => {
      // verfity 1 parmas token verify and 2 secert passed
      const secert = process.env.SECRET;
      return jwt.verify(String(data), secert as string);
    };

    const decoded = verfiyAccessToken(token) as JwtPayload;
    console.log(decoded);
    if (decoded) {
      // this decoded varible have id and role
      req.UserId = decoded.user._id;
      const id = req.UserId;
      console.log(id);
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    }
  } catch (error) {
    console.error("Error: " + error);
    return res.status(400).json({ status: "400", message: "Bad request" });
  }
};

export { isAdmin, isLoggedIn };
