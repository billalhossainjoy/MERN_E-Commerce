"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
const env_config_1 = require("../config/env.config");
paypal_rest_sdk_1.default.configure({
    mode: "sandbox",
    client_id: env_config_1.PAYPAL_CLIENT_ID,
    client_secret: env_config_1.PAYPAL_SECRET_KEY,
});
exports.default = paypal_rest_sdk_1.default;
