"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const CustomError_1 = __importDefault(require("./CustomError"));
const jwt_utils_1 = require("../utils/jwt.utils");
const env_config_1 = require("../config/env.config");
const generateAccessRefreshToken = (data) => {
    try {
        const payload = {
            _id: data._id,
            username: data.username,
            email: data.email,
            role: data.role,
        };
        const accessToken = (0, jwt_utils_1.generateToken)(payload, env_config_1.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: env_config_1.JWT_ACCESS_TOKEN_EXPIRY,
        });
        const refreshToken = (0, jwt_utils_1.generateToken)({ _id: data._id }, env_config_1.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: env_config_1.JWT_ACCESS_TOKEN_EXPIRY,
        });
        return { accessToken, refreshToken };
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError)
            throw new CustomError_1.default(401, error.message);
        throw error;
    }
};
exports.default = generateAccessRefreshToken;
