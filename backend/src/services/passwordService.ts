import { Types } from 'mongoose';
import { Password, IPassword } from '../models/Password';
import { encryptPassword, decryptPassword } from '../utils/encryption';

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
    return password.save();
  }

  static async getAllPasswords(userId: Types.ObjectId): Promise<IPassword[]> {
    return Password.find({ userId });
  }

  static async getPasswordById(
    userId: Types.ObjectId,
    passwordId: string
  ): Promise<IPassword | null> {
    return Password.findOne({ _id: passwordId, userId });
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
    return Password.findOneAndUpdate(
      { _id: passwordId, userId },
      updateData,
      { new: true }
    );
  }

  static async deletePassword(
    userId: Types.ObjectId,
    passwordId: string
  ): Promise<IPassword | null> {
    return Password.findOneAndDelete({ _id: passwordId, userId });
  }

  static async searchPasswords(
    userId: Types.ObjectId,
    query: string
  ): Promise<IPassword[]> {
    return Password.find({
      userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } },
        { url: { $regex: query, $options: 'i' } },
      ],
    });
  }

  static async decryptPasswordData(password: IPassword): Promise<IPassword> {
    const decryptedData = password.toObject();
    decryptedData.password = await decryptPassword(password.password);
    return decryptedData;
  }

  static async decryptPasswordsData(passwords: IPassword[]): Promise<IPassword[]> {
    return Promise.all(
      passwords.map(async (password) => this.decryptPasswordData(password))
    );
  }
}