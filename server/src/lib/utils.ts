import { Request } from "express";
import { verifyToken } from "../utils/jwt.utils";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET,
} from "../config/env.config";
import UserModel, { User } from "../model/User.model";
import Asynchandler from "./AsyncHandler";
import { isValidObjectId } from "mongoose";

export const validUser = async (req: Request): Promise<User | false> => {
  try {
    const { access_token: accessToken } = req.cookies;
    if (!accessToken) return false;
    const validToken = verifyToken(accessToken, JWT_ACCESS_TOKEN_SECRET);
    if (!validToken) return false;
    const User = await UserModel.findOne({ _id: validToken._id, accessToken });
    if (!User) return false;
    return User;
  } catch (error) {
    throw error;
  }
};

