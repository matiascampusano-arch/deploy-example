"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_js_1 = require("../controllers/authController.js");
exports.authRouter = (0, express_1.Router)();
const limiter_js_1 = require("../middleware/limiter.js");
exports.authRouter.post("/signup", limiter_js_1.limiter, authController_js_1.signup);
exports.authRouter.post("/signin", limiter_js_1.limiter, authController_js_1.signin);
