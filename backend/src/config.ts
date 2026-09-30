import "dotenv/config";

export const PORT = Number(process.env.PORT) || 3000;
export const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "https://deploy-example-fo8h.vercel.app";
export const JWT_SECRET =
  process.env.JWT_SECRET || "clave-de-practica-no-usar-en-produccion";

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/deploy-example";
