"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
exports.authRouter = express_1.default.Router();
exports.authRouter.route('/login').post(authController_1.login);
exports.authRouter.route('/register').post(authController_1.register);
exports.authRouter.route('/dashboard').get(auth_1.authMidware, authController_1.dashboard);
