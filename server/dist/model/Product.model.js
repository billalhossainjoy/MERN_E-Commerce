"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    salePrice: { type: Number },
    totalStack: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "active",
        required: true,
    },
    isPhysical: {
        type: Boolean,
    },
    weight: { type: String },
    unit: { type: String },
    images: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = ProductModel;
