"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const config_js_1 = require("./config.js");
let connectionPromise = null;
async function connectDatabase() {
    if (mongoose_1.default.connection.readyState === 1) {
        return;
    }
    if (!connectionPromise || mongoose_1.default.connection.readyState === 0) {
        connectionPromise = mongoose_1.default
            .connect(config_js_1.MONGODB_URI, { maxPoolSize: 10 })
            .catch((error) => {
            connectionPromise = null;
            throw error;
        });
    }
    await connectionPromise;
}
