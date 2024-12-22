import jwt from "jsonwebtoken";
import { IUser, User } from "../models/User";
import { config } from "../config/environment";
import { hashPassword, comparePassword } from "../utils/encryption";

export class AuthService {
  static async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ user: IUser; token: string }> {
    try {
      // Email kontrolü
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error("Bu email adresi zaten kullanımda");
      }

      // Şifreyi hashle
      const hashedPassword = await hashPassword(userData.password);

      // Yeni kullanıcı oluştur
      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();

      // JWT token oluştur
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: "7d",
      });

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static async login(credentials: {
    email: string;
    password: string;
  }): Promise<{ user: IUser; token: string }> {
    try {
      // Kullanıcıyı bul
      const user = await User.findOne({ email: credentials.email });
      if (!user) {
        throw new Error("Geçersiz email veya şifre");
      }

      // Şifre kontrolü
      const isValidPassword = await comparePassword(
        credentials.password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Geçersiz email veya şifre");
      }

      // JWT token oluştur
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: "7d",
      });

      return { user, token };
    } catch (error) {
      throw error;
    }
  }
}
