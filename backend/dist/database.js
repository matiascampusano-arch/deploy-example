"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = require("./config.js");
async function connectDatabase() {
    await mongoose_1.default.connect(config_js_1.MONGODB_URI, { maxPoolSize: 10 });
    console.log("Conexión a MongoDB establecida");
}
