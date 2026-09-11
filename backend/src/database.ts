import mongoose from "mongoose";

import { MONGODB_URI } from "./config.js";

let connectionPromise: ReturnType<typeof mongoose.connect> | null = null;

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise || mongoose.connection.readyState === 0) {
    connectionPromise = mongoose
      .connect(MONGODB_URI, { maxPoolSize: 10 })
      .catch((error: unknown) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;
}
