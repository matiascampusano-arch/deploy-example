import cors from "cors";
import express from "express";
import { FRONTEND_ORIGIN } from "./config.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
export const app = express();
app.use(express.json());
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(authRouter);
app.use("/users", userRouter);
app.get("/", (_req, res) => {
    res.json({ ok: true, message: "API de autenticación de práctica — Sprint 15" });
});
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: "Ocurrió un error inesperado." });
});
