import { JsonWebTokenError } from "jsonwebtoken";
import ErrorApi from "./CustomError";
import { User } from "../model/User.model";
import { generateToken } from "../utils/jwt.utils";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_ACCESS_TOKEN_SECRET,
} from "../config/env.config";

const generateAccessRefreshToken = (data: User) => {
  try {
    const payload = {
      _id: data._id,
      username: data.username,
      email: data.email,
      role: data.role,
    };

    const accessToken = generateToken(payload, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = generateToken(
      { _id: data._id },
      JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      throw new ErrorApi(401, error.message);

    throw error;
  }
};

export default generateAccessRefreshToken;
