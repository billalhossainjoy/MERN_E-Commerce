"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseApi = (res, status, message, data) => {
    return res.status(status).json({
        success: status > 0 && status < 400,
        message,
        data,
    });
};
exports.default = ResponseApi;
