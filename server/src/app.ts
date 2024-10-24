import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import ErrorHandler, { NotFoundHandler } from "./lib/ErrorHandler";
import authRouter from "./router/auth.router";
import userRouter from "./router/user.router";
import productRouter from "./router/admin/product.router";
import shoppingProduct from "./router/shopping/product.router";
import cartRouter from "./router/cart.router";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public/")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin/product", productRouter);
app.use("/api/shopping", shoppingProduct);
app.use("/api/cart", cartRouter);

// Not found error handler
app.use(NotFoundHandler);

// Default error handler

app.use(ErrorHandler);

export default app;
