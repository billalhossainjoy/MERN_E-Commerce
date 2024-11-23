"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYPAL_SECRET_KEY = exports.PAYPAL_CLIENT_ID = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.JWT_REFRESH_TOKEN_EXPIRY = exports.JWT_REFRESH_TOKEN_SECRET = exports.JWT_ACCESS_TOKEN_EXPIRY = exports.JWT_ACCESS_TOKEN_SECRET = exports.MONGODB_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_SECRET_KEY: process.env.PAYPAL_SECRET_KEY,
};
exports.MONGODB_URI = env.MONGODB_URI, exports.JWT_ACCESS_TOKEN_SECRET = env.JWT_ACCESS_TOKEN_SECRET, exports.JWT_ACCESS_TOKEN_EXPIRY = env.JWT_ACCESS_TOKEN_EXPIRY, exports.JWT_REFRESH_TOKEN_SECRET = env.JWT_REFRESH_TOKEN_SECRET, exports.JWT_REFRESH_TOKEN_EXPIRY = env.JWT_REFRESH_TOKEN_EXPIRY, exports.CLOUDINARY_CLOUD_NAME = env.CLOUDINARY_CLOUD_NAME, exports.CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY, exports.CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET, exports.PAYPAL_CLIENT_ID = env.PAYPAL_CLIENT_ID, exports.PAYPAL_SECRET_KEY = env.PAYPAL_SECRET_KEY;
