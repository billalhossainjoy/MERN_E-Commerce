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
exports.getUser = void 0;
const AsyncHandler_1 = __importDefault(require("../lib/AsyncHandler"));
const ResponseHandler_1 = __importDefault(require("../lib/ResponseHandler"));
const User_model_1 = __importDefault(require("../model/User.model"));
exports.getUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findById(req.user._id).select("-password -refreshToken");
        return (0, ResponseHandler_1.default)(res, 200, "Get.", user);
    }
    catch (error) {
        throw error;
    }
}));
