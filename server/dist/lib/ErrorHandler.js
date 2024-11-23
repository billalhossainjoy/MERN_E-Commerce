"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundHandler = void 0;
const config_1 = __importDefault(require("../config/config"));
const AsyncHandler_1 = __importDefault(require("./AsyncHandler"));
const CustomError_1 = __importDefault(require("./CustomError"));
exports.NotFoundHandler = (0, AsyncHandler_1.default)((req, res, next) => next(new CustomError_1.default(404, "this route is not found")));
const ErrorHandler = (err, req, res, next) => {
    var _a;
    const statusCode = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
    const message = config_1.default.NODE_ENV === "development" ? err.message : "Server side error.";
    const error = config_1.default.NODE_ENV === "development" ? Object.assign({}, err.errors) : undefined;
    res.status(statusCode).json({
        success: false,
        message,
        error
    });
};
exports.default = ErrorHandler;
