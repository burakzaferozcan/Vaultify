import { Types } from "mongoose";
import { Password, IPassword } from "../models/Password";
import { encryptPassword, decryptPassword } from "../utils/encryption";
import { ActivityService } from "./activityService";

export class PasswordService {
  static async createPassword(data: {
    userId: Types.ObjectId;
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
  }): Promise<IPassword> {
    const encryptedPassword = await encryptPassword(data.password);
    const password = new Password({
      ...data,
      password: encryptedPassword,
    });
    const savedPassword = await password.save();

    await ActivityService.createActivity({
      userId: data.userId,
      action: "create",
      resourceType: "password",
      details: `Created password for ${data.title}`,
    });

    return savedPassword;
  }

  static async getAllPasswords(userId: Types.ObjectId): Promise<IPassword[]> {
    const passwords = await Password.find({ userId });

    // await ActivityService.createActivity({
    //   userId,
    //   action: "view",
    //   resourceType: "password",
    //   details: "Viewed all passwords",
    // });

    return passwords;
  }

  static async getPasswordById(
    userId: Types.ObjectId,
    passwordId: string
  ): Promise<IPassword | null> {
    const password = await Password.findOne({ _id: passwordId, userId });

    if (password) {
      await ActivityService.createActivity({
        userId,
        action: "view",
        resourceType: "password",
        details: `Viewed password for ${password.title}`,
      });
    }

    return password;
  }

  static async updatePassword(
    userId: Types.ObjectId,
    passwordId: string,
    data: {
      title?: string;
      username?: string;
      password?: string;
      url?: string;
      notes?: string;
    }
  ): Promise<IPassword | null> {
    const updateData = { ...data };
    if (data.password) {
      updateData.password = await encryptPassword(data.password);
    }

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: passwordId, userId },
      updateData,
      { new: true }
    );

    if (updatedPassword) {
      await ActivityService.createActivity({
        userId,
        action: "update",
        resourceType: "password",
        details: `Updated password for ${updatedPassword.title}`,
      });
    }

    return updatedPassword;
  }

  static async deletePassword(
    userId: Types.ObjectId,
    passwordId: string
  ): Promise<IPassword | null> {
    const password = await Password.findOneAndDelete({
      _id: passwordId,
      userId,
    });

    if (password) {
      await ActivityService.createActivity({
        userId,
        action: "delete",
        resourceType: "password",
        details: `Deleted password for ${password.title}`,
      });
    }

    return password;
  }

  static async decryptPasswordsData(
    passwords: IPassword[]
  ): Promise<IPassword[]> {
    return Promise.all(
      passwords.map(async (password) => {
        const decryptedPassword = await decryptPassword(password.password);
        return {
          ...password.toObject(),
          password: decryptedPassword,
        };
      })
    );
  }

  static async searchPasswords(
    userId: Types.ObjectId,
    query: string
  ): Promise<IPassword[]> {
    const passwords = await Password.find({
      userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
        { url: { $regex: query, $options: "i" } },
        { notes: { $regex: query, $options: "i" } },
      ],
    });

    if (passwords.length > 0) {
      await ActivityService.createActivity({
        userId,
        action: "view",
        resourceType: "password",
        details: `Searched for passwords with query: ${query}`,
      });
    }

    return passwords;
  }
}
