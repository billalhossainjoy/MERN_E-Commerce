"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../../controller/shopping/product.controller");
const router = (0, express_1.Router)();
router.route("/products").get(product_controller_1.FetchAllProducts);
router.route("/product/:id").get(product_controller_1.FetchProduct);
router.route("/search/:keyword").get(product_controller_1.searchProduct);
exports.default = router;
