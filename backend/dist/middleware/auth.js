"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
function authMiddleware(req, res, next) {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        res.status(401).json({
            message: "Falta el token de autorización (Authorization: Bearer <token>).",
        });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_js_1.JWT_SECRET);
        if (typeof payload.sub !== "string") {
            throw new Error("El token no contiene un usuario válido.");
        }
        req.userId = payload.sub;
        next();
    }
    catch {
        res.status(401).json({ message: "Token inválido o vencido." });
    }
}
