import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/User";
import { config } from "../config/environment";
import { ActivityService } from "./activityService";
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
        throw new Error("This email address is already in use");
      }

      // Şifreyi hashle
      const hashedPassword = await hashPassword(userData.password);

      // Yeni kullanıcı oluştur
      const user = new User({
        ...userData,
        password: hashedPassword,
      });

      await user.save();

      // Activity kaydı oluştur
      await ActivityService.createActivity({
        userId: user._id,
        action: "create",
        resourceType: "account",
        details: "Created new account",
      });

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
        throw new Error("Invalid email or password");
      }

      // Şifre kontrolü
      const isValidPassword = await comparePassword(
        credentials.password,
        user.password
      );

      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }

      // Activity kaydı oluştur
      await ActivityService.createActivity({
        userId: user._id,
        action: "login",
        resourceType: "account",
        details: "Logged in",
      });

      // JWT token oluştur
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
        expiresIn: "7d",
      });

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static async logout(userId: Types.ObjectId): Promise<void> {
    // Activity kaydı oluştur
    await ActivityService.createActivity({
      userId,
      action: "logout",
      resourceType: "account",
      details: "Logged out",
    });
  }

  static async updateProfile(
    userId: Types.ObjectId,
    data: {
      firstName?: string;
      lastName?: string;
      email?: string;
    }
  ): Promise<IUser | null> {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

    if (updatedUser) {
      // Activity kaydı oluştur
      await ActivityService.createActivity({
        userId,
        action: "update",
        resourceType: "account",
        details: "Updated profile information",
      });
    }

    return updatedUser;
  }

  static async changePassword(
    userId: Types.ObjectId,
    data: {
      currentPassword: string;
      newPassword: string;
    }
  ): Promise<IUser | null> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await comparePassword(
      data.currentPassword,
      user.password
    );
    if (!isValidPassword) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await hashPassword(data.newPassword);
    user.password = hashedPassword;
    await user.save();

    // Activity kaydı oluştur
    await ActivityService.createActivity({
      userId,
      action: "update",
      resourceType: "account",
      details: "Changed password",
    });

    return user;
  }
}
