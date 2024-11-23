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
exports.validUser = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const env_config_1 = require("../config/env.config");
const User_model_1 = __importDefault(require("../model/User.model"));
const validUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { access_token: accessToken } = req.cookies;
        if (!accessToken)
            return false;
        const validToken = (0, jwt_utils_1.verifyToken)(accessToken, env_config_1.JWT_ACCESS_TOKEN_SECRET);
        if (!validToken)
            return false;
        const User = yield User_model_1.default.findOne({ _id: validToken._id, accessToken });
        if (!User)
            return false;
        return User;
    }
    catch (error) {
        throw error;
    }
});
exports.validUser = validUser;
