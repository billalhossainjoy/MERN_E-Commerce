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
const jsonwebtoken_1 = require("jsonwebtoken");
const env_config_1 = require("../config/env.config");
const AsyncHandler_1 = __importDefault(require("../lib/AsyncHandler"));
const CustomError_1 = __importDefault(require("../lib/CustomError"));
const User_model_1 = __importDefault(require("../model/User.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const Protected = (0, AsyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token } = req.cookies;
        if (!access_token) {
            throw new CustomError_1.default(401, "Unauthorized.");
        }
        const decoded = (0, jwt_utils_1.verifyToken)(access_token, env_config_1.JWT_ACCESS_TOKEN_SECRET);
        if (!decoded) {
            throw new CustomError_1.default(401, "Unauthorized.");
        }
        const user = yield User_model_1.default.findOne({
            _id: decoded._id,
            accessToken: access_token,
        }).select("-passowrd -refreshToken");
        if (!user) {
            throw new CustomError_1.default(401, "Unauthorized.");
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError)
            if (error.message === "jwt expired")
                throw new CustomError_1.default(401, "Session Expired.");
        throw error;
    }
}));
exports.default = Protected;
