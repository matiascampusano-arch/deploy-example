import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
export function authMiddleware(req, res, next) {
    const header = req.headers.authorization || "";
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) {
        res.status(401).json({
            message: "Falta el token de autorización (Authorization: Bearer <token>).",
        });
        return;
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
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
