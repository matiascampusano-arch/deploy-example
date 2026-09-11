import "dotenv/config";
export const PORT = Number(process.env.PORT) || 3000;
export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
export const JWT_SECRET = process.env.JWT_SECRET || "clave-de-practica-no-usar-en-produccion";
if (!process.env.MONGODB_URI) {
    throw new Error("Falta MONGODB_URI en backend/.env para conectar con MongoDB Atlas.");
}
export const MONGODB_URI = process.env.MONGODB_URI;
