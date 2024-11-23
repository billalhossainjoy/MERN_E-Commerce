"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
const zod_1 = require("zod");
exports.AddressSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    address: zod_1.z.string(),
    city: zod_1.z.string(),
    pincode: zod_1.z.string(),
    phone: zod_1.z.string(),
    notes: zod_1.z.string().optional(),
    addressType: zod_1.z.enum(["HOME", "OFFICE", "OTHER"]),
});
