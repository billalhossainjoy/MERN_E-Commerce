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
exports.searchProduct = exports.FetchProduct = exports.FetchAllProducts = void 0;
const mongoose_1 = require("mongoose");
const ResponseHandler_1 = __importDefault(require("../../lib/ResponseHandler"));
const Product_model_1 = __importDefault(require("../../model/Product.model"));
const AsyncHandler_1 = __importDefault(require("../../lib/AsyncHandler"));
const CustomError_1 = __importDefault(require("../../lib/CustomError"));
exports.FetchAllProducts = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let projection = {
        totalStack: 0,
        status: 0,
        createdAt: 0,
    };
    try {
        const query = req.query;
        Object.keys(query).forEach((key) => {
            const option = query[key];
            if (option && typeof option === "string" && option.length > 0)
                query[key] = option.split(",");
            else
                query[key] = [];
        });
        const filters = {
            category: Array.isArray(query.category) && query.category.length > 0
                ? { $in: query.category }
                : { $exists: true },
            brand: Array.isArray(query.brand) && query.brand.length > 0
                ? { $in: query.brand }
                : { $exists: true },
        };
        const sort = {};
        switch (Array.isArray(query.sortBy) && query.sortBy[0]) {
            case "price-lowtohigh":
                sort.price = 1;
                break;
            case "price-hightolow":
                sort.price = -1;
                break;
            case "title-atoz":
                sort.title = 1;
                break;
            case "title-ztoa":
                sort.title = -1;
                break;
        }
        const products = yield Product_model_1.default.find(filters).sort(sort);
        return (0, ResponseHandler_1.default)(res, 200, "Get all products.", products);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}));
exports.FetchProduct = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(id))
            throw new CustomError_1.default(500, "Product not found");
        const product = yield Product_model_1.default.findById(id);
        if (!product)
            throw new CustomError_1.default(404, "Product not found");
        return (0, ResponseHandler_1.default)(res, 200, "Get all products.", product);
    }
    catch (error) {
        throw error;
    }
}));
exports.searchProduct = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword } = req.params;
        if (!keyword || typeof keyword !== "string")
            throw new CustomError_1.default(401, "Invalid keyword");
        const regEx = new RegExp(keyword, "i");
        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ],
        };
        const searchResults = yield Product_model_1.default.find(createSearchQuery);
        console.log(exports.searchProduct);
        return (0, ResponseHandler_1.default)(res, 200, "Search products.", searchResults);
    }
    catch (error) {
        console.log(error);
    }
}));
