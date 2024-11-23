"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const Protected_1 = __importDefault(require("../middleware/Protected"));
const router = (0, express_1.Router)();
router.route("/signup").post(auth_controller_1.registerUser);
router.route("/login").post(auth_controller_1.loginUser);
router.route("/logout").get(Protected_1.default, auth_controller_1.logoutUser);
router.route("/refresh-token").get(auth_controller_1.refreshToken);
exports.default = router;
