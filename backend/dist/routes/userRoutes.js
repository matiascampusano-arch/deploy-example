"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_js_1 = require("../controllers/userController.js");
const auth_js_1 = require("../middleware/auth.js");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get("/me", auth_js_1.authMiddleware, userController_js_1.getCurrentUser);
