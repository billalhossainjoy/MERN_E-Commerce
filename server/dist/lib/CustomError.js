"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorApi extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorApi;
