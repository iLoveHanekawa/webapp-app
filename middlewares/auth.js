"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMidware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomError_1 = require("../errors/CustomError");
const authMidware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(`authHeader: ${authHeader}`);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw Error('no token');
    }
    try {
        const token = authHeader.split(' ')[1];
        console.log(`Auth token: ${token}`);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
    }
    catch (error) {
        throw (0, CustomError_1.createCustomError)('Token expired', 401);
    }
    next();
};
exports.authMidware = authMidware;
