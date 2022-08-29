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
exports.storeRefreshToken = exports.generateAccessToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const CustomError_1 = require("../errors/CustomError");
require("dotenv/config");
const dayjs_1 = __importDefault(require("dayjs"));
const dayJS = (0, dayjs_1.default)();
const generateAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.jwt;
    try {
        const decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const token = jwt.sign({ id: decode.id }, process.env.JWT_SECRET, { expiresIn: '10s' });
        res.json({ id: decode.id, token });
    }
    catch (error) {
        throw (0, CustomError_1.createCustomError)('Expired token: Login again', 401);
    }
});
exports.generateAccessToken = generateAccessToken;
const storeRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw (0, CustomError_1.createCustomError)('Login / register first', 401);
    }
    const refreshToken = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
    console.log('Token set in cookies');
    res.cookie('jwt', refreshToken, { secure: true, httpOnly: true, expires: dayJS.add(3, 'minutes').toDate() }).send();
});
exports.storeRefreshToken = storeRefreshToken;
