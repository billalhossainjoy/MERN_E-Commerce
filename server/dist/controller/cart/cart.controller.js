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
exports.deleteCart = exports.updateCart = exports.fetchCart = exports.addToCart = void 0;
const mongoose_1 = require("mongoose");
const AsyncHandler_1 = __importDefault(require("../../lib/AsyncHandler"));
const CustomError_1 = __importDefault(require("../../lib/CustomError"));
const Product_model_1 = __importDefault(require("../../model/Product.model"));
const cart_model_1 = __importDefault(require("../../model/cart.model"));
const ResponseHandler_1 = __importDefault(require("../../lib/ResponseHandler"));
exports.addToCart = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0)
            throw new CustomError_1.default(401, " user, product id and quantity required");
        const product = yield Product_model_1.default.findById(productId).session(session);
        if (!product)
            throw new CustomError_1.default(401, " Product not found ");
        let cart = yield cart_model_1.default.findOne({ userId });
        if (!cart)
            cart = new cart_model_1.default({ userId, items: [] });
        const findProductIndex = cart.items.findIndex((value) => value.productId.toString() === productId);
        if (findProductIndex === -1)
            cart.items.push({ productId, quantity });
        else
            cart.items[findProductIndex].quantity += quantity;
        const updatedCart = yield cart.save();
        if (!updatedCart)
            throw new CustomError_1.default(401, " server side error");
        const payload = {
            productId: productId,
            image: product.images[0],
            title: product.title,
            price: product.price,
            salePrice: product.salePrice,
            quantity: (_a = updatedCart.items.find((item) => item.productId.toString() === productId)) === null || _a === void 0 ? void 0 : _a.quantity,
        };
        return (0, ResponseHandler_1.default)(res, 200, `${product.title} added in cart successfully`, payload);
    }
    catch (error) {
        throw error;
    }
}));
exports.fetchCart = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId)
            throw new CustomError_1.default(401, "User id required");
        const cart = yield cart_model_1.default.findOne({ userId }).populate({
            path: "items.productId",
            select: "images title price salePrice ",
        });
        if (!cart)
            throw new CustomError_1.default(404, "Cart not found");
        cart.items[0].productId;
        const validItems = cart.items.filter((productItem) => productItem.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            yield cart.save();
        }
        const populateCartItems = validItems.map((item) => {
            const product = item.productId;
            return {
                productId: product.id,
                image: product.images[0],
                title: product.title,
                price: product.price,
                salePrice: product.salePrice,
                quantity: item.quantity,
            };
        });
        return (0, ResponseHandler_1.default)(res, 200, "Cart fetched successfully", populateCartItems);
    }
    catch (error) {
        throw error;
    }
}));
exports.updateCart = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            throw new CustomError_1.default(400, "Product id and quantity required");
        }
        const cart = yield cart_model_1.default.findOne({ userId });
        if (!cart)
            throw new CustomError_1.default(404, "Cart not found");
        const updatedData = cart.items.find((item) => {
            if (item.productId.toString() === productId) {
                item.quantity = quantity;
                return item;
            }
            return;
        });
        yield cart.save();
        return (0, ResponseHandler_1.default)(res, 200, "Cart updated successfully", updatedData);
    }
    catch (error) {
        throw error;
    }
}));
exports.deleteCart = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: productId } = req.params;
        const userId = req.user._id;
        if (!productId || !userId)
            throw new CustomError_1.default(401, "Product id and user id required");
        const cart = yield cart_model_1.default.findOne({
            userId,
        });
        if (!cart)
            throw new CustomError_1.default(404, "Cart not found");
        const findCartProductIndex = cart.items.findIndex((item) => {
            return item.productId.toString() === productId;
        });
        if (findCartProductIndex === -1)
            throw new CustomError_1.default(404, "Product not found in cart");
        const removedCart = cart.items.splice(findCartProductIndex, 1);
        yield cart.save();
        if (!userId)
            throw new CustomError_1.default(401, "User id required");
        return (0, ResponseHandler_1.default)(res, 200, "Cart deleted successfully", removedCart[0]);
    }
    catch (error) {
        throw error;
    }
}));
