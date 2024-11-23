"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Protected_1 = __importDefault(require("../../middleware/Protected"));
const product_controller_1 = require("../../controller/admin/product.controller");
const multer_1 = __importDefault(require("../../lib/multer"));
const router = (0, express_1.Router)();
router.route("/all-products").get(Protected_1.default, product_controller_1.allProducts);
router.route("/get/:id").get(Protected_1.default, product_controller_1.getProduct);
router
    .route("/new-product")
    .post(multer_1.default.array("products"), Protected_1.default, product_controller_1.addProduct);
router
    .route("/update/:id")
    .put(multer_1.default.array("products"), Protected_1.default, product_controller_1.updateProduct);
router.route("/delete/:id").delete(Protected_1.default, product_controller_1.deleteProduct);
exports.default = router;
