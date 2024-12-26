import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { user, token } = await AuthService.register(req.body);

      return res.status(201).json({
        message: "Registration successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Registration failed",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { user, token } = await AuthService.login(req.body);

      return res.json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Login process failed",
      });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.user;
      return res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Unable to retrieve profile information",
      });
    }
  }
}
