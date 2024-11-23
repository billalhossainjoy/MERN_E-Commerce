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
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.allProducts = exports.addProduct = void 0;
const AsyncHandler_1 = __importDefault(require("../../lib/AsyncHandler"));
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
const CustomError_1 = __importDefault(require("../../lib/CustomError"));
const ResponseHandler_1 = __importDefault(require("../../lib/ResponseHandler"));
const Product_model_1 = __importDefault(require("../../model/Product.model"));
const product_schema_1 = require("../../schema/product.schema");
exports.addProduct = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uploadedImages = [];
    try {
        const productImages = req.files;
        const body = product_schema_1.ProductSchema.parse(Object.assign(Object.assign({}, req.body), { isPhysical: JSON.parse(req.body.isPhysical) }));
        uploadedImages = yield Promise.all(productImages.map((img) => cloudinary_1.default
            .upload(img.buffer, { folder: "products_img" })
            .then((res) => res.secure_url)));
        if (productImages.length !== uploadedImages.length)
            throw new CustomError_1.default(500, "Images are not uploaded");
        const data = Object.assign(Object.assign({}, body), { images: uploadedImages });
        const product = yield Product_model_1.default.create(Object.assign({}, data));
        if (!product)
            throw new CustomError_1.default(500, "product is not created.");
        return (0, ResponseHandler_1.default)(res, 200, "Product added successfully.", product);
    }
    catch (error) {
        if (uploadedImages && uploadedImages.length > 0)
            yield cloudinary_1.default.destoryFiles(uploadedImages, "products_img");
        throw error;
    }
}));
exports.allProducts = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_model_1.default.find({});
        return (0, ResponseHandler_1.default)(res, 200, "Get all products.", products);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}));
exports.getProduct = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const products = yield Product_model_1.default.findById(id);
        if (!products)
            throw new CustomError_1.default(404, "Product not found.");
        return (0, ResponseHandler_1.default)(res, 200, "Get product.", products);
    }
    catch (error) {
        throw error;
    }
}));
exports.updateProduct = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productImages = req.files;
        const body = Object.assign(Object.assign({}, req.body), { isPhysical: JSON.parse(req.body.isPhysical) });
        const product = yield Product_model_1.default.findById(id);
        if (!product)
            throw new CustomError_1.default(404, "Product not found.");
        const oldImageArray = JSON.parse(req.body.deleteImages);
        const oldImageList = [];
        product.images = product.images.filter((img, index) => {
            oldImageArray.includes(index) && oldImageList.push(img);
            return !oldImageArray.includes(index) && img;
        });
        const uploadedImage = yield Promise.all(productImages.map((img) => cloudinary_1.default
            .upload(img.buffer, { folder: "products_img" })
            .then((res) => res.secure_url)));
        if (uploadedImage.length > productImages.length)
            throw new CustomError_1.default(500, "Server side error");
        yield cloudinary_1.default.destoryFiles(oldImageList, "products_img");
        product.images = [...product.images, ...uploadedImage];
        product.title = body.title;
        product.description = body.description;
        product.category = body.category;
        product.brand = body.brand;
        product.price = +body.price;
        product.salePrice = +body.salePrice;
        product.totalStack = +body.totalStack;
        product.unit = body.unit;
        product.isPhysical = body.isPhysical;
        product.weight = body.weight;
        product.status = body.status;
        const updateProducts = yield product.save();
        return (0, ResponseHandler_1.default)(res, 200, "Product updated successfully.", updateProducts);
    }
    catch (error) {
        throw error;
    }
}));
exports.deleteProduct = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const existingProducts = yield Product_model_1.default.findById(id);
        if (!existingProducts)
            throw new CustomError_1.default(404, "Product not found.");
        const deletedProduct = yield Product_model_1.default.findByIdAndDelete(id);
        yield cloudinary_1.default.destoryFiles(existingProducts.images, "products_img");
        return (0, ResponseHandler_1.default)(res, 200, "Product deleted successfully.", deletedProduct);
    }
    catch (error) {
        throw error;
    }
}));
