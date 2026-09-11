import mongoose from "mongoose";

import { MONGODB_URI } from "./config.js";

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
  console.log("Conexión a MongoDB establecida");
}