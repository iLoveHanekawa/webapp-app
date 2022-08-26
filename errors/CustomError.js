"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(msg, code) {
        super(msg);
        this.statusCode = code;
    }
}
exports.CustomError = CustomError;
const createCustomError = (msg, code) => {
    return new CustomError(msg, code);
};
exports.createCustomError = createCustomError;
