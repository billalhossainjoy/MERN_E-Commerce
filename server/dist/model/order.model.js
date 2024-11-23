"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: Number,
        },
    ],
    addressId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    cart: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
    orderStatus: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "inprocess",
            "inshipping",
            "delivered",
            "rejected",
        ],
        required: true,
    },
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderUpdateDate: {
        type: Date,
        default: Date.now,
    },
    paymentId: String,
    payerId: String,
}, {
    timestamps: true,
});
const OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = OrderModel;
