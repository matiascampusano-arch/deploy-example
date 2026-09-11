import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { FRONTEND_ORIGIN } from "./config.js";
import { connectDatabase } from "./database.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

export const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cors({ origin: FRONTEND_ORIGIN }));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "API de autenticación de práctica — Sprint 15",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, data: { status: "ok" }, error: null });
});

app.use(async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (error) {
    next(error);
  }
});

app.use(authRouter);
app.use("/users", userRouter);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Ocurrió un error inesperado." });
});

export default app;
