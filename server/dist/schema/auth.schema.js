"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = exports.passwordSchema = exports.emailSchema = exports.usernameSchema = void 0;
const zod_1 = require("zod");
exports.usernameSchema = zod_1.z
    .string()
    .min(4, "username must be at least 4 characters long.");
exports.emailSchema = zod_1.z
    .string()
    .email("Invalid email. please enter a valid email address.");
exports.passwordSchema = zod_1.z
    .string()
    .min(4, "username must be at least 8 characters long."); // TODO: length change before build
exports.signUpSchema = zod_1.z.object({
    username: exports.usernameSchema,
    email: exports.emailSchema,
    password: exports.passwordSchema,
});
exports.loginSchema = zod_1.z.object({
    identifier: zod_1.z.string(),
    password: zod_1.z.string(),
});
