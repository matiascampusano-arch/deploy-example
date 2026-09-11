"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.JWT_SECRET = exports.FRONTEND_ORIGIN = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = Number(process.env.PORT) || 3000;
exports.FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
exports.JWT_SECRET = process.env.JWT_SECRET || "clave-de-practica-no-usar-en-produccion";
exports.MONGODB_URI = "mongodb+srv://matias_ayhungry:6COmli5zfBhQTLqK@cluster0.wn7yor8.mongodb.net/cohort41?appName=Cluster0";
