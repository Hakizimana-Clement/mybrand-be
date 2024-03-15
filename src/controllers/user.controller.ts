import { Request, Response } from "express";
import User from "../models/userModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET as string;

// create jwt token
const createToken = (data: object) => {
  return jwt.sign({ data }, secretKey, { expiresIn: "1d" });
};

////////////////////////// Signup /////////////////////////////////////
const signupUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
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
    const token = createToken(user);

    res.status(201).json({
      status: "201",
      message: "Signup successfully",
      data: { email, token },
    });
    // console.log(user);
  } catch (error: any) {
    res
      .status(400)
      .json({ status: "400", message: "Bad request", error: error.message });
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
      throw Error("Invalid password");
    }

    // create token
    const token = createToken(user);

    res.status(200).json({
      status: "200",
      message: "Login successfully",
      data: { email, token },
    });
  } catch (error: any) {
    res
      .status(404)
      .json({ status: "400", message: "Not Found", error: error.message });
  }
};

export { loginUser, signupUser };
