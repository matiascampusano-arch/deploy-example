import { Router } from "express";

import { signin, signup } from "../controllers/authController.js";

export const authRouter = Router();

import { limiter } from "../middleware/limiter.js";

authRouter.post("/signup", limiter, signup);
authRouter.post("/signin", limiter, signin);
