import mongoose from "mongoose";

import { MONGODB_URI } from "./config.js";

export async function connectDatabase(): Promise<void> {
  await mongoose.connect(MONGODB_URI, { maxPoolSize: 10 });
  console.log("Conexión a MongoDB establecida");
}
