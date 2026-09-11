"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.signin = signin;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const User_js_1 = require("../models/User.js");
function isDuplicateKeyError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000);
}
async function signup(req, res, next) {
    const { email, password } = req.body || {};
    if (!email || !password) {
        res.status(400).json({ message: "email y password son obligatorios." });
        return;
    }
    try {
        const existingUser = await User_js_1.UserModel.exists({ email });
        if (existingUser) {
            res.status(409).json({ message: "Ya existe una cuenta con ese email." });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await User_js_1.UserModel.create({ email, passwordHash });
        res.status(201).json({ user: { _id: user.id, email: user.email } });
    }
    catch (error) {
        if (isDuplicateKeyError(error)) {
            res.status(409).json({ message: "Ya existe una cuenta con ese email." });
            return;
        }
        next(error);
    }
}
async function signin(req, res, next) {
    const { email, password } = req.body || {};
    try {
        const user = await User_js_1.UserModel.findOne({ email: email || "" }).select("+passwordHash");
        if (!user || !(await bcryptjs_1.default.compare(password || "", user.passwordHash))) {
            res.status(401).json({ message: "Email o contraseña incorrectos." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ sub: user.id }, config_js_1.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
}
