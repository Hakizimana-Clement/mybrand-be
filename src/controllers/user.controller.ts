import { Request, Response } from "express";
import User from "../models/userModels";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET as string;

// create jwt token
const createToken = (_id: object) => {
  return jwt.sign({ _id }, secretKey, { expiresIn: "2d" });
};

////////////////////////// Login /////////////////////////////////////
const loginUser = async (req: Request, res: Response) => {
  res.json({ message: "login" });
};

////////////////////////// Signup /////////////////////////////////////
const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    //validation password
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    // Email
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw Error("Email already in use");
    }

    // Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // save in model
    const user = await User.create({ name, email, password: hash });

    // create token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
    // console.log(user);
  } catch (error: any) {
    // console.log("error ", error);
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
