"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Asynchandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch((err) => next(err));
exports.default = Asynchandler;
