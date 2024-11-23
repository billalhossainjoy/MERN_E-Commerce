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
const cloudinary_1 = require("cloudinary");
const env_config_1 = require("../config/env.config");
const CustomError_1 = __importDefault(require("./CustomError"));
const stream_1 = require("stream");
class Cloudinary {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: env_config_1.CLOUDINARY_CLOUD_NAME,
            api_key: env_config_1.CLOUDINARY_API_KEY,
            api_secret: env_config_1.CLOUDINARY_API_SECRET,
        });
    }
    upload(file, option) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    folder: (option === null || option === void 0 ? void 0 : option.folder) || "Assets",
                    resource_type: (option === null || option === void 0 ? void 0 : option.resource_type) || "auto",
                }, (err, result) => {
                    if (err)
                        reject(new CustomError_1.default(500, "Upload failed."));
                    else if (result)
                        resolve(result);
                    else
                        reject(new CustomError_1.default(500, "No result."));
                });
                const readable = new stream_1.Readable();
                readable.push(file);
                readable.push(null);
                readable.pipe(uploadStream);
            });
        });
    }
    destroy(path_1) {
        return __awaiter(this, arguments, void 0, function* (path, folder = "") {
            var _a, _b;
            const publicId = (_b = (_a = path.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]) !== null && _b !== void 0 ? _b : "";
            try {
                return yield cloudinary_1.v2.uploader.destroy(folder + "/" + publicId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    destoryFiles(files, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(files.map((file) => this.destroy(file, folder).then((res) => res === null || res === void 0 ? void 0 : res.result)));
        });
    }
}
exports.default = new Cloudinary();
