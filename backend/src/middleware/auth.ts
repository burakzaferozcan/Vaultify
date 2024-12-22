import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/environment";
import { User } from "../models/User";
import { RequestHandler } from "express";

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Lütfen giriş yapın" });
      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: "Lütfen giriş yapın" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Lütfen giriş yapın" });
  }
};
