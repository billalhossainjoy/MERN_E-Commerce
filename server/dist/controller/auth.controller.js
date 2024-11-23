"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const AsyncHandler_1 = __importDefault(require("../lib/AsyncHandler"));
const CustomError_1 = __importDefault(require("../lib/CustomError"));
const JWT_1 = __importDefault(require("../lib/JWT"));
const ResponseHandler_1 = __importDefault(require("../lib/ResponseHandler"));
const User_model_1 = __importDefault(require("../model/User.model"));
const auth_schema_1 = require("../schema/auth.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};
exports.registerUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = auth_schema_1.signUpSchema.parse(req.body);
        const existingUser = yield User_model_1.default.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            if (existingUser.email === email && existingUser.username === username)
                throw new CustomError_1.default(409, "This email and username already exist.");
            else if (existingUser.email === email)
                throw new CustomError_1.default(409, "User email exists.");
            else
                throw new CustomError_1.default(409, "Username already exists.");
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield User_model_1.default.create({
            username,
            email,
            password: hashPassword,
        });
        if (!newUser)
            throw new CustomError_1.default(500, "User not created.");
        const { refreshToken, accessToken } = yield (0, JWT_1.default)(newUser);
        const response = yield User_model_1.default.findByIdAndUpdate(newUser.id, {
            refreshToken,
            accessToken,
        }, { new: true }).select("-password -refresh-token");
        if (!response)
            throw new CustomError_1.default(500, "User not created.");
        res.cookie("access_token", accessToken, cookieOptions);
        res.cookie("refresh_token", refreshToken, cookieOptions);
        return (0, ResponseHandler_1.default)(res, 200, "Signup successfully.", response);
    }
    catch (error) {
        throw error;
    }
}));
exports.loginUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { identifier, password } = auth_schema_1.loginSchema.parse(req.body);
        const existingUser = yield User_model_1.default.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });
        if (!existingUser)
            throw new CustomError_1.default(400, "Invalid User.", {
                fields: { username: true },
            });
        const isMatched = yield bcryptjs_1.default.compare(password, existingUser === null || existingUser === void 0 ? void 0 : existingUser.password);
        if (!isMatched)
            throw new CustomError_1.default(401, "Invalid password! please try again.", {
                fields: { password: true },
            });
        const { refreshToken, accessToken } = yield (0, JWT_1.default)(existingUser);
        const response = yield User_model_1.default.findByIdAndUpdate(existingUser.id, {
            refreshToken,
            accessToken,
        }, { new: true }).select("-password -refresh-token");
        if (!response)
            throw new CustomError_1.default(500, "User not created.");
        res.cookie("access_token", accessToken, cookieOptions);
        res.cookie("refresh_token", refreshToken, cookieOptions);
        return (0, ResponseHandler_1.default)(res, 200, "Login successfully.", response);
    }
    catch (error) {
        throw error;
    }
}));
exports.logoutUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_model_1.default.findByIdAndUpdate(req.user._id, {
            accessToken: undefined,
            refreshToken: undefined,
        }, { new: true });
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        return (0, ResponseHandler_1.default)(res, 200, "Logout successful.");
    }
    catch (error) {
        throw error;
    }
}));
exports.refreshToken = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token, refresh_token } = req.cookies;
        if (!access_token || !access_token)
            throw new CustomError_1.default(401, "Unauthorized User");
        const existingUser = yield User_model_1.default.findOne({
            refreshToken: refresh_token,
            accessToken: access_token,
        });
        // if (!existingUser) res.clearCookie("access_token");
        // if( !existingUser) res.clearCookie("refresh_token");
        if (!existingUser)
            throw new CustomError_1.default(401, "Unauthorized User");
        const { refreshToken, accessToken } = yield (0, JWT_1.default)(existingUser);
        const response = yield User_model_1.default.findByIdAndUpdate(existingUser.id, {
            refreshToken,
            accessToken,
        }, { new: true }).select("-password -refresh-token");
        if (!response)
            throw new CustomError_1.default(500, "User not created.");
        res.cookie("access_token", accessToken, cookieOptions);
        res.cookie("refresh_token", refreshToken, cookieOptions);
        return (0, ResponseHandler_1.default)(res, 200, "Login successfully.", {
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        throw error;
    }
}));
