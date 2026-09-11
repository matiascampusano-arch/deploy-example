import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { UserModel } from "../models/User.js";
function isDuplicateKeyError(error) {
    return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}
export async function signup(req, res, next) {
    const { email, password } = req.body || {};
    if (!email || !password) {
        res.status(400).json({ message: "email y password son obligatorios." });
        return;
    }
    try {
        const existingUser = await UserModel.exists({ email });
        if (existingUser) {
            res.status(409).json({ message: "Ya existe una cuenta con ese email." });
            return;
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ email, passwordHash });
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
export async function signin(req, res, next) {
    const { email, password } = req.body || {};
    try {
        const user = await UserModel.findOne({ email: email || "" }).select("+passwordHash");
        if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
            res.status(401).json({ message: "Email o contraseña incorrectos." });
            return;
        }
        const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
}
