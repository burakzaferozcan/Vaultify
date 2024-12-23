import { Request, Response } from "express";
import { Types } from "mongoose";
import { PasswordService } from "../services/passwordService";

export class PasswordController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.user._id);
      const password = await PasswordService.createPassword({
        userId,
        ...req.body,
      });

      return res.status(201).json({
        message: "Şifre başarıyla kaydedildi",
        password,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Şifre oluşturulurken bir hata oluştu",
      });
    }
  }

  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.user._id);
      const passwords = await PasswordService.getAllPasswords(userId);
      const decryptedPasswords = await PasswordService.decryptPasswordsData(
        passwords
      );

      return res.json(decryptedPasswords);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Şifreler getirilirken bir hata oluştu",
      });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.user._id);
      const password = await PasswordService.getPasswordById(
        userId,
        req.params.id
      );

      if (!password) {
        return res.status(404).json({ error: "Şifre bulunamadı" });
      }

      const decryptedPassword = await PasswordService.decryptPasswordData(
        password
      );
      return res.json(decryptedPassword);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Şifre getirilirken bir hata oluştu",
      });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.user._id);
      const updatedPassword = await PasswordService.updatePassword(
        userId,
        req.params.id,
        req.body
      );

      if (!updatedPassword) {
        return res.status(404).json({ error: "Şifre bulunamadı" });
      }

      return res.json({
        message: "Şifre başarıyla güncellendi",
        password: updatedPassword,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Şifre güncellenirken bir hata oluştu",
      });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.user._id);
      const deletedPassword = await PasswordService.deletePassword(
        userId,
        req.params.id
      );

      if (!deletedPassword) {
        return res.status(404).json({ error: "Şifre bulunamadı" });
      }

      return res.json({ message: "Şifre başarıyla silindi" });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Şifre silinirken bir hata oluştu",
      });
    }
  }

  static async search(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.user._id);
      const query = req.query.query as string;

      const passwords = await PasswordService.searchPasswords(userId, query);
      const decryptedPasswords = await PasswordService.decryptPasswordsData(
        passwords
      );

      return res.json(decryptedPasswords);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Şifre araması yapılırken bir hata oluştu",
      });
    }
  }

  static async export(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new Types.ObjectId(req.user._id);
      const format = (req.query.format as string) || "json";

      const passwords = await PasswordService.getAllPasswords(userId);
      const decryptedPasswords = await PasswordService.decryptPasswordsData(
        passwords
      );

      if (format === "csv") {
        const fields = [
          "title",
          "username",
          "password",
          "url",
          "notes",
          "createdAt",
        ];
        const csv = decryptedPasswords.map((pass) =>
          fields.map((field) => (pass as any)[field]).join(",")
        );
        csv.unshift(fields.join(",")); // Başlık satırını ekle

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=passwords.csv"
        );
        return res.send(csv.join("\n"));
      }

      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=passwords.json"
      );
      return res.json(decryptedPasswords);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "Şifreler dışa aktarılırken bir hata oluştu",
      });
    }
  }
}
