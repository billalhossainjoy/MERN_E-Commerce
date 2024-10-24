import Asynchandler from "../lib/AsyncHandler";
import ErrorApi from "../lib/CustomError";
import generateAccessRefreshToken from "../lib/JWT";
import ResponseApi from "../lib/ResponseHandler";
import UserModel from "../model/User.model";
import { loginSchema, signUpSchema } from "../schema/auth.schema";
import bcrypt from "bcryptjs";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const registerUser = Asynchandler(async (req, res) => {
  try {
    const { username, email, password } = signUpSchema.parse(req.body);

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.email === email && existingUser.username === username)
        throw new ErrorApi(409, "This email and username already exist.");
      else if (existingUser.email === email)
        throw new ErrorApi(409, "User email exists.");
      else throw new ErrorApi(409, "Username already exists.");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    if (!newUser) throw new ErrorApi(500, "User not created.");

    const { refreshToken, accessToken } = await generateAccessRefreshToken(
      newUser
    );

    const response = await UserModel.findByIdAndUpdate(
      newUser.id,
      {
        refreshToken,
        accessToken,
      },
      { new: true }
    ).select("-password -refresh-token");
    if (!response) throw new ErrorApi(500, "User not created.");

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", refreshToken, cookieOptions);

    return ResponseApi(res, 200, "Signup successfully.", response);
  } catch (error) {
    throw error;
  }
});

export const loginUser = Asynchandler(async (req, res) => {
  try {
    const { identifier, password } = loginSchema.parse(req.body);

    const existingUser = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!existingUser)
      throw new ErrorApi(400, "Invalid User.", {
        fields: { username: true },
      });

    const isMatched = await bcrypt.compare(password, existingUser?.password);
    if (!isMatched)
      throw new ErrorApi(401, "Invalid password! please try again.", {
        fields: { password: true },
      });

    const { refreshToken, accessToken } = await generateAccessRefreshToken(
      existingUser
    );

    const response = await UserModel.findByIdAndUpdate(
      existingUser.id,
      {
        refreshToken,
        accessToken,
      },
      { new: true }
    ).select("-password -refresh-token");
    if (!response) throw new ErrorApi(500, "User not created.");

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", refreshToken, cookieOptions);

    return ResponseApi(res, 200, "Login successfully.", response);
  } catch (error) {
    throw error;
  }
});

export const logoutUser = Asynchandler(async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        accessToken: undefined,
        refreshToken: undefined,
      },
      { new: true }
    );
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return ResponseApi(res, 200, "Logout successful.");
  } catch (error) {
    throw error;
  }
});

export const refreshToken = Asynchandler(async (req, res) => {
  try {
    const { access_token, refresh_token } = req.cookies;
    if (!access_token || !access_token)
      throw new ErrorApi(401, "Unauthorized User");
    const existingUser = await UserModel.findOne({
      refreshToken: refresh_token,
      accessToken: access_token,
    });
    // if (!existingUser) res.clearCookie("access_token");
    // if( !existingUser) res.clearCookie("refresh_token");
    if (!existingUser) throw new ErrorApi(401, "Unauthorized User");

    const { refreshToken, accessToken } = await generateAccessRefreshToken(
      existingUser
    );

    const response = await UserModel.findByIdAndUpdate(
      existingUser.id,
      {
        refreshToken,
        accessToken,
      },
      { new: true }
    ).select("-password -refresh-token");
    if (!response) throw new ErrorApi(500, "User not created.");

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", refreshToken, cookieOptions);

    return ResponseApi(res, 200, "Login successfully.", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw error;
  }
});
