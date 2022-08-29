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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("express-async-errors");
const connect_1 = require("./db/connect");
const authRouter_1 = require("./routes/authRouter");
const noRoute_1 = require("./middlewares/noRoute");
const errorMidware_1 = require("./middlewares/errorMidware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tokenRouter_1 = require("./routes/tokenRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('hi mom');
});
app.use('/api/v1', authRouter_1.authRouter);
app.use('/', tokenRouter_1.tokenRouter);
app.use(noRoute_1.noRoute);
app.use(errorMidware_1.errorMidware);
const port = Number(process.env.PORT) || 5000;
const start = (port, uri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, connect_1.connectDB)(uri);
        console.log('connected to db');
        app.listen(port, () => {
            console.log(`server listening at port: ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start(port, process.env.MONGO_URI);
