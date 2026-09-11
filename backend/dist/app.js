"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_js_1 = require("./config.js");
const authRoutes_js_1 = require("./routes/authRoutes.js");
const userRoutes_js_1 = require("./routes/userRoutes.js");
exports.app = (0, express_1.default)();
exports.app.set("trust proxy", 1);
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({ origin: config_js_1.FRONTEND_ORIGIN }));
exports.app.use(authRoutes_js_1.authRouter);
exports.app.use("/users", userRoutes_js_1.userRouter);
exports.app.get("/", (_req, res) => {
    res.json({
        ok: true,
        message: "API de autenticación de práctica — Sprint 15",
    });
});
exports.app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: "Ocurrió un error inesperado." });
});
exports.app.get("/health", (_req, res) => {
    res.status(200).json({ success: true, data: { status: "ok" }, error: null });
});
