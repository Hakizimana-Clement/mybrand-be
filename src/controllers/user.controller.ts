import { Request, Response } from "express";
import User from "../models/userModels";
import bcrypt from "bcrypt";
import { JwtUtils } from "../utils/jwt.util";

////////////////////////// Signup /////////////////////////////////////
const signupUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  try {
    // Email
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw Error("Email already in use");
    }

    // Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    await User.create({ name, email, password: hash, role });

    res.status(201).json({
      status: "201",
      message: "Signup successfully",
    });
    // console.log(user);
  } catch (error: any) {
    res
      .status(409)
      .json({ status: "409", message: "Conflict", error: error.message });
  }
};

////////////////////////// Login /////////////////////////////////////
const loginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // validation
    if (!email || !req.body.password) {
      throw Error("All fields must be filled");
    }
    // check use email exist
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("Wrong credential");
    }

    // check password
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // password not match
    if (!passwordMatch) {
      throw Error("Wrong credential");
    }
    const token = await JwtUtils.createToken({
      _id: user._id,
      name: user.name,
      role: user.role,
    });

    res.status(200).json({
      status: "200",
      message: "Login successfully",
      token: token,
    });
  } catch (error: any) {
    res
      .status(401)
      .json({ status: "401", message: "Unauthorized", error: error.message });
  }
};

export { loginUser, signupUser };
