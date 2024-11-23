"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderDetailsByAdmin = exports.getAllOrderByAdmin = exports.getAllOrderByUser = exports.getOrderDetailsByUser = exports.capturePayment = exports.createOrder = void 0;
const AsyncHandler_1 = __importDefault(require("../lib/AsyncHandler"));
const CustomError_1 = __importDefault(require("../lib/CustomError"));
const paypal_1 = __importDefault(require("../lib/paypal"));
const ResponseHandler_1 = __importDefault(require("../lib/ResponseHandler"));
const cart_model_1 = __importDefault(require("../model/cart.model"));
const order_model_1 = __importDefault(require("../model/order.model"));
const Product_model_1 = __importDefault(require("../model/Product.model"));
const order_schema_1 = require("../schema/order.schema");
const createOrder = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let amount = 0;
    try {
        req.body.userId = req.user._id.toString();
        const { products, userId, addressId, paymentMethod } = order_schema_1.OrderSchema.parse(req.body);
        const cart = yield cart_model_1.default.findOne({ userId }).populate("items.productId");
        if (!cart)
            throw new CustomError_1.default(404, "Cart not found");
        cart.items.forEach((item) => {
            const product = item.productId;
            amount += product.price * item.quantity;
        });
        const create_payment_jason = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://localhost:5173/shopping/paypal-return",
                cancel_url: "http://localhost:5173/shopping/paypal-cancel",
            },
            transactions: [
                {
                    amount: {
                        currency: "USD",
                        total: String(amount),
                    },
                    description: "Create the payment",
                },
            ],
        };
        paypal_1.default.payment.create(create_payment_jason, (error, paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            if (error)
                throw new CustomError_1.default(401, "Error creating payment");
            const order = yield order_model_1.default.create({
                userId,
                products,
                addressId,
                cart: cart.id,
                orderStatus: "pending",
                paymentMethod: paymentMethod,
                paymentStatus: "pending",
                totalAmount: amount + 100,
                paymentId: "",
                payerId: "",
            });
            const approvalURL = (_b = (_a = paymentInfo.links) === null || _a === void 0 ? void 0 : _a.find((link) => link.rel === "approval_url")) === null || _b === void 0 ? void 0 : _b.href;
            return (0, ResponseHandler_1.default)(res, 200, "Payment successfully", {
                orderId: order.id,
                approvalURL,
            });
        }));
    }
    catch (error) {
        throw error;
    }
}));
exports.createOrder = createOrder;
const capturePayment = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId, payerId, orderId } = order_schema_1.OrderCaptureSchema.parse(req.body);
        const order = yield order_model_1.default.findById(orderId).populate("cart");
        if (!order)
            throw new CustomError_1.default(404, "Order not found.");
        order.paymentId = paymentId;
        order.payerId = payerId;
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        yield order.save();
        const decrementProduct = (item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield Product_model_1.default.findById(item.productId);
            if (!product)
                return;
            yield Product_model_1.default.findByIdAndUpdate(item.productId, {
                totalStack: product.totalStack - item.quantity,
            }, { new: true });
        });
        (() => __awaiter(void 0, void 0, void 0, function* () {
            for (const item of order.cart.items) {
                yield decrementProduct(item);
            }
        }))();
        yield cart_model_1.default.findByIdAndDelete(order.cart);
        return (0, ResponseHandler_1.default)(res, 200, "Payment captured successfully.", order);
    }
    catch (error) {
        throw error;
    }
}));
exports.capturePayment = capturePayment;
const getAllOrderByUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const orders = yield order_model_1.default.find({ userId }).populate("products");
        return (0, ResponseHandler_1.default)(res, 200, "Orders fetched successfully.", orders);
    }
    catch (error) {
        throw error;
    }
}));
exports.getAllOrderByUser = getAllOrderByUser;
const getOrderDetailsByUser = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const userId = req.user._id;
        const order = yield order_model_1.default.findOne({ _id: orderId, userId }).populate("addressId products._id");
        if (!order)
            throw new CustomError_1.default(404, "Order not found.");
        return (0, ResponseHandler_1.default)(res, 200, "Order fetched successfully.", order);
    }
    catch (error) {
        throw error;
    }
}));
exports.getOrderDetailsByUser = getOrderDetailsByUser;
const getOrderDetailsByAdmin = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const userId = req.user._id;
        if (!userId && req.user.role !== "ADMIN")
            throw new CustomError_1.default(401, "User not authenticated.");
        const order = yield order_model_1.default.findOne({ _id: orderId }).populate("addressId products._id");
        return (0, ResponseHandler_1.default)(res, 200, "Order fetched successfully.", order);
    }
    catch (error) {
        throw error;
    }
}));
exports.getOrderDetailsByAdmin = getOrderDetailsByAdmin;
const getAllOrderByAdmin = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        if (!userId && req.user.role !== "ADMIN")
            throw new CustomError_1.default(401, "User not authenticated.");
        const order = yield order_model_1.default.find();
        return (0, ResponseHandler_1.default)(res, 200, "Order fetched successfully.", order);
    }
    catch (error) {
        throw error;
    }
}));
exports.getAllOrderByAdmin = getAllOrderByAdmin;
const updateOrderStatus = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const { status } = req.body;
        if (status !== "pending" ||
            "inprocess" ||
            "inshipping" ||
            "delivered" ||
            "rejected")
            if (!userId && req.user.role !== "ADMIN")
                throw new CustomError_1.default(401, "User not authenticated.");
        const order = yield order_model_1.default.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
        return (0, ResponseHandler_1.default)(res, 200, "Order fetched successfully.", order);
    }
    catch (error) {
        throw error;
    }
}));
exports.updateOrderStatus = updateOrderStatus;
