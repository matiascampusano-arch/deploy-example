import type { NextFunction, Response } from "express";

import { UserModel } from "../models/User.js";
import type { AuthenticatedRequest } from "../types/AuthenticatedRequest.js";

export async function getCurrentUser(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      res
        .status(404)
        .json({ message: "El usuario dueño de este token ya no existe." });
      return;
    }

    res.status(200).json({ _id: user.id, email: user.email });
  } catch (error) {
    next(error);
  }
}
