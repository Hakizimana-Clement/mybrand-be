import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const secretKey = process.env.SECRET as string;
interface IUserData {
  _id: mongoose.Types.ObjectId;
  name: string;
  role: string;
}

interface IDecodedToken {
  _id: string;
  role: string;
  name: string;
  iat: number;
  exp: number;
}

export class JwtUtils {
  static async createToken(user: IUserData): Promise<string> {
    return jwt.sign(user, secretKey, { expiresIn: "1d" });
  }

  static async verifyToken(token: string): Promise<IDecodedToken> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as IDecodedToken);
        }
      });
    });
  }
}
