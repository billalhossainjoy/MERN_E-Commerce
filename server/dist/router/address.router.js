"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Protected_1 = __importDefault(require("../middleware/Protected"));
const address_controller_1 = require("../controller/address.controller");
const router = (0, express_1.Router)();
router.route("/add-address").post(Protected_1.default, address_controller_1.addAddress);
router.route("/edit-address/:addressId").put(Protected_1.default, address_controller_1.editAddress);
router.route("/fetch-all-address").get(Protected_1.default, address_controller_1.fetchAllAddress);
router.route("/delete-address/:addressId").delete(Protected_1.default, address_controller_1.deleteAddress);
exports.default = router;
