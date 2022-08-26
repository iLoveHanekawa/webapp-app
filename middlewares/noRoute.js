"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noRoute = void 0;
const noRoute = (req, res) => {
    res.status(404).send({ msg: 'page not found' });
};
exports.noRoute = noRoute;
