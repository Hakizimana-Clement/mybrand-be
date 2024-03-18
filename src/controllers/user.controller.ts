import { Request, Response } from "express";
import User from "../models/userModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET as string;

// create jwt token
const createToken = (user: object) => {
  return jwt.sign({ user }, secretKey, { expiresIn: "1d" });
};

////////////////////////// Signup /////////////////////////////////////
const signupUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    // if (!role) {
    //   throw Error("provide fill role");
    // }
    // Email
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw Error("Email already in use");
    }

    // Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // save in model
    const user = await User.create({ name, email, password: hash, role });
    const dataToSendInToken = {
      id: user._id,
      role: user.role,
    };
    // create token
    const token = createToken(dataToSendInToken);
    // const token = createToken(user._id);

    res.status(201).json({
      status: "201",
      message: "Signup successfully",
      data: { email, token },
    });
    // console.log(user);
  } catch (error: any) {
    res
      .status(409)
      .json({ status: "409", message: "Conflict", error: error.message });
    // .json({ status: "409", error: error.message });
  }
};

////////////////////////// Login /////////////////////////////////////
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
    // check use email exist
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Invalid email");
    }

    // check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    // password not match
    if (!passwordMatch) {
      throw Error("Wrong credential");
    }

    // create token
    const token = createToken({ id: user._id, role: user.role });

    res.status(200).json({
      status: "200",
      message: "Login successfully",
      data: { email, token },
    });
  } catch (error: any) {
    res
      .status(401)
      .json({ status: "401", message: "Unauthorized", error: error.message });
  }
};

export { loginUser, signupUser };
