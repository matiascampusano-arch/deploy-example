import "dotenv/config";

export const PORT = Number(process.env.PORT) || 3000;
export const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:5173";
export const JWT_SECRET =
  process.env.JWT_SECRET || "clave-de-practica-no-usar-en-produccion";

export const MONGODB_URI =
  "mongodb+srv://matias_ayhungry:6COmli5zfBhQTLqK@cluster0.wn7yor8.mongodb.net/cohort41?appName=Cluster0";
