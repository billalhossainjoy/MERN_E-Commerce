"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Protected_1 = __importDefault(require("../middleware/Protected"));
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
router.route("/get").get(Protected_1.default, user_controller_1.getUser);
exports.default = router;
