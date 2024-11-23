"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const ErrorHandler_1 = __importStar(require("./lib/ErrorHandler"));
const auth_router_1 = __importDefault(require("./router/auth.router"));
const user_router_1 = __importDefault(require("./router/user.router"));
const product_router_1 = __importDefault(require("./router/admin/product.router"));
const product_router_2 = __importDefault(require("./router/shopping/product.router"));
const cart_router_1 = __importDefault(require("./router/cart.router"));
const address_router_1 = __importDefault(require("./router/address.router"));
const order_router_1 = __importDefault(require("./router/order.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public/")));
// Routes
app.use("/api/auth", auth_router_1.default);
app.use("/api/user", user_router_1.default);
app.use("/api/product", product_router_1.default);
app.use("/api/shopping", product_router_2.default);
app.use("/api/cart", cart_router_1.default);
app.use("/api/address", address_router_1.default);
app.use("/api/order", order_router_1.default);
// Not found error handler
app.use(ErrorHandler_1.NotFoundHandler);
// Default error handler
app.use(ErrorHandler_1.default);
exports.default = app;
