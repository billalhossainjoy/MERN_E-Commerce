"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Protected_1 = __importDefault(require("../middleware/Protected"));
const order_controller_1 = require("../controller/order.controller");
const router = (0, express_1.Router)();
router.route("/create-order").post(Protected_1.default, order_controller_1.createOrder);
router.route("/capture-order").post(Protected_1.default, order_controller_1.capturePayment);
router.route("/list").get(Protected_1.default, order_controller_1.getAllOrderByUser);
router.route("/details/:orderId").get(Protected_1.default, order_controller_1.getOrderDetailsByUser);
router.route("/admin-list").get(Protected_1.default, order_controller_1.getAllOrderByAdmin);
router.route("/admin-details/:orderId").get(Protected_1.default, order_controller_1.getOrderDetailsByAdmin);
router.route("/update-order-status/:id").post(Protected_1.default, order_controller_1.updateOrderStatus);
exports.default = router;
