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
exports.deleteAddress = exports.fetchAllAddress = exports.editAddress = exports.addAddress = void 0;
const AsyncHandler_1 = __importDefault(require("../lib/AsyncHandler"));
const CustomError_1 = __importDefault(require("../lib/CustomError"));
const ResponseHandler_1 = __importDefault(require("../lib/ResponseHandler"));
const address_model_1 = __importDefault(require("../model/address.model"));
const address_schema_1 = require("../schema/address.schema");
const addAddress = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, _id } = req.user;
        const totalAddress = yield address_model_1.default.find({ userId: _id });
        if (totalAddress.length >= 4)
            throw new CustomError_1.default(403, "Max address limit reached");
        console.log(totalAddress);
        const addressData = address_schema_1.AddressSchema.parse(req.body);
        const createdAddress = yield address_model_1.default.create(Object.assign(Object.assign({}, addressData), { name: username, userId: req.user._id }));
        return (0, ResponseHandler_1.default)(res, 200, "Address created", createdAddress);
    }
    catch (error) {
        throw error;
    }
}));
exports.addAddress = addAddress;
const editAddress = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const { addressId } = req.params;
        if (!addressId)
            throw new CustomError_1.default(401, "invalid address");
        const addressData = address_schema_1.AddressSchema.parse(req.body);
        const address = yield address_model_1.default.findOneAndUpdate({ _id: addressId, userId }, addressData, { new: true });
        if (!address)
            throw new CustomError_1.default(404, "Address not found");
        return (0, ResponseHandler_1.default)(res, 200, "Address updated", address);
    }
    catch (error) {
        throw error;
    }
}));
exports.editAddress = editAddress;
const fetchAllAddress = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const addresses = yield address_model_1.default.find({ userId });
        return (0, ResponseHandler_1.default)(res, 200, "ok", addresses);
    }
    catch (error) {
        throw error;
    }
}));
exports.fetchAllAddress = fetchAllAddress;
const deleteAddress = (0, AsyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: userId } = req.user;
        const { addressId } = req.params;
        if (!addressId)
            throw new CustomError_1.default(401, "Invalid address");
        const deleteAddress = yield address_model_1.default.findOneAndDelete({
            _id: addressId,
            userId,
        });
        return (0, ResponseHandler_1.default)(res, 200, "Address deleted", deleteAddress);
    }
    catch (error) {
        throw error;
    }
}));
exports.deleteAddress = deleteAddress;
