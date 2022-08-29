"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMidware = void 0;
const CustomError_1 = require("../errors/CustomError");
const errorMidware = (err, req, res, next) => {
    if (err instanceof CustomError_1.CustomError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    res.status(500).json({ msg: "something went wrong" });
};
exports.errorMidware = errorMidware;
