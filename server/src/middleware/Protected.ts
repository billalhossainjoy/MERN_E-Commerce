import { JsonWebTokenError } from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET } from "../config/env.config";
import Asynchandler from "../lib/AsyncHandler";
import ErrorApi from "../lib/CustomError";
import UserModel, { User } from "../model/User.model";
import { verifyToken } from "../utils/jwt.utils";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const Protected = Asynchandler(async (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    if (!access_token) {
      throw new ErrorApi(401, "Unauthorized.");
    }

    const decoded = verifyToken(access_token, JWT_ACCESS_TOKEN_SECRET);
    if (!decoded) {
      throw new ErrorApi(401, "Unauthorized.");
    }

    const user = await UserModel.findOne({
      _id: decoded._id,
      accessToken: access_token,
    }).select("-passowrd -refreshToken");

    if (!user) {
      throw new ErrorApi(401, "Unauthorized.");
    }
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError)
      if (error.message === "jwt expired")
        throw new ErrorApi(401, "Session Expired.");
    throw error;
  }
});

export default Protected;
