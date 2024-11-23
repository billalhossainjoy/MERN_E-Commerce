"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const zod_1 = require("zod");
exports.ProductSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.string(),
    brand: zod_1.z.string(),
    price: zod_1.z.string(),
    salePrice: zod_1.z.string(),
    totalStack: zod_1.z.string(),
    status: zod_1.z.string(),
    isPhysical: zod_1.z.boolean().optional(),
    weight: zod_1.z.string().optional(),
    unit: zod_1.z.string().optional()
});
