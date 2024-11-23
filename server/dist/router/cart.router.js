"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart/cart.controller");
const Protected_1 = __importDefault(require("../middleware/Protected"));
const router = (0, express_1.Router)();
router.route("/addtocart").post(Protected_1.default, cart_controller_1.addToCart);
router.route("/fetchcarts/:userId").get(Protected_1.default, cart_controller_1.fetchCart);
router.route("/updatecart").post(Protected_1.default, cart_controller_1.updateCart);
router.route("/deletecart/:id").post(Protected_1.default, cart_controller_1.deleteCart);
exports.default = router;
