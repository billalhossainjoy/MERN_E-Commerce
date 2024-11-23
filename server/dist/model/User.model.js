"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    accessToken: String,
    refreshToken: String,
}, {
    timestamps: true,
});
const UserModel = (0, mongoose_1.model)("User", UserSchema);
exports.default = UserModel;
