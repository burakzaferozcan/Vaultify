import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { user, token } = await AuthService.register(req.body);

      return res.status(201).json({
        message: "Kayıt başarılı",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Kayıt işlemi başarısız",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { user, token } = await AuthService.login(req.body);

      return res.json({
        message: "Giriş başarılı",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Giriş işlemi başarısız",
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
        error: error.message || "Profil bilgileri alınamadı",
      });
    }
  }
}
