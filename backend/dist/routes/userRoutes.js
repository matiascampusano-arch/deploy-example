import { Router } from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";
export const userRouter = Router();
userRouter.get("/me", authMiddleware, getCurrentUser);
