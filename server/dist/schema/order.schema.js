"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCaptureSchema = exports.OrderSchema = void 0;
const zod_1 = require("zod");
const ProductSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    quantity: zod_1.z.number(),
});
exports.OrderSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    products: zod_1.z.array(ProductSchema),
    addressId: zod_1.z.string(),
    paymentMethod: zod_1.z.string(),
});
exports.OrderCaptureSchema = zod_1.z.object({
    paymentId: zod_1.z.string(),
    payerId: zod_1.z.string(),
    orderId: zod_1.z.string(),
});
