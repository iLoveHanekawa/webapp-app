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
exports.dashboard = exports.register = exports.login = void 0;
require("dotenv/config");
const authModel_1 = __importDefault(require("../models/authModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CustomError_1 = require("../errors/CustomError");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw (0, CustomError_1.createCustomError)('Mail and Pass are required fields', 401);
    }
    const user = yield authModel_1.default.findOne({ email: email });
    if (!user) {
        throw (0, CustomError_1.createCustomError)('Please register first', 401);
    }
    const isPassCorrect = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPassCorrect) {
        throw (0, CustomError_1.createCustomError)('Incorrect password', 401);
    }
    const authToken = user.createJWT(process.env.JWT_SECRET);
    const refreshToken = user.createJWT(process.env.JWT_REFRESH_SECRET);
    console.log({ user, authToken, refreshToken });
    res.json({ user, authToken, refreshToken });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password || !lastName || !firstName) {
        throw (0, CustomError_1.createCustomError)('All fields are required', 400);
    }
    const user = yield authModel_1.default.create({ firstName, lastName, email, password });
    const authToken = user.createJWT(process.env.JWT_SECRET);
    const refreshToken = user.createJWT(process.env.JWT_REFRESH_SECRET);
    console.log({ user, authToken, refreshToken });
    res.status(201).json({ user, authToken, refreshToken });
});
exports.register = register;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req;
    const user = yield authModel_1.default.findOne({ _id: id });
    if (!user) {
        throw (0, CustomError_1.createCustomError)('No such user', 400);
    }
    const num = Math.floor(Math.random() * 100);
    res.status(200).json({ userMsg: `Hello, ${user.firstName} ${user.lastName}!`, secretMsg: `Secret string: ${num}` });
});
exports.dashboard = dashboard;
