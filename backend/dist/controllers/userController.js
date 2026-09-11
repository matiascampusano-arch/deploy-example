"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = getCurrentUser;
const User_js_1 = require("../models/User.js");
async function getCurrentUser(req, res, next) {
    try {
        const user = await User_js_1.UserModel.findById(req.userId);
        if (!user) {
            res
                .status(404)
                .json({ message: "El usuario dueño de este token ya no existe." });
            return;
        }
        res.status(200).json({ _id: user.id, email: user.email });
    }
    catch (error) {
        next(error);
    }
}
