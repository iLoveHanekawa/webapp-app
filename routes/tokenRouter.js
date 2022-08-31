"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenRouter = void 0;
const refreshController_1 = require("../controllers/refreshController");
const express_1 = __importDefault(require("express"));
exports.tokenRouter = express_1.default.Router();
exports.tokenRouter.route('/token').get(refreshController_1.generateAccessToken);
exports.tokenRouter.route('/refresh').get(refreshController_1.storeRefreshToken);
exports.tokenRouter.route('/logout').get(refreshController_1.deleteRefreshToken);
