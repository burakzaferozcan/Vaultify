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
        message: "Password successfully saved",
        password,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "An error occurred while creating a password",
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
        error: error.message || "An error occurred while retrieving passwords",
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
        return res.status(404).json({ error: "Password not found" });
      }

      const decryptedPassword = await PasswordService.decryptPasswordData(
        password
      );
      return res.json(decryptedPassword);
    } catch (error: any) {
      return res.status(400).json({
        error:
          error.message || "An error occurred while retrieving the password",
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
        return res.status(404).json({ error: "Password not found" });
      }

      return res.json({
        message: "Password updated successfully",
        password: updatedPassword,
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "An error occurred while updating the password",
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
        return res.status(404).json({ error: "Password not found" });
      }

      return res.json({ message: "Password successfully deleted" });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "An error occurred while deleting the password",
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
        error:
          error.message || "An error occurred while searching for a password",
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

      const fieldMapping = {
        title: "Title",
        username: "Username",
        password: "Password",
        url: "URL",
        notes: "Notes",
        createdAt: "Creation Date",
        updatedAt: "Last Updated",
      };

      const sanitizedPasswords = decryptedPasswords.map(
        ({ title, username, password, url, notes, createdAt, updatedAt }) => ({
          Title: title,
          Username: username,
          Password: password,
          URL: url,
          Notes: notes,
          "Creation Date": createdAt?.toISOString().split("T")[0],
          "Last Updated": updatedAt?.toISOString().split("T")[0],
        })
      );

      if (format === "csv") {
        const fields = [
          "Title",
          "Username",
          "Password",
          "URL",
          "Notes",
          "Creation Date",
          "Last Updated",
        ];

        const csv = sanitizedPasswords.map((pass) =>
          fields
            .map((field) => {
              const value = (pass as any)[field];

              return value ? `"${value.toString().replace(/"/g, '""')}"` : "";
            })
            .join(",")
        );
        csv.unshift(fields.join(","));

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

      return res.send(JSON.stringify(sanitizedPasswords, null, 2));
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || "An error occurred while exporting passwords",
      });
    }
  }
}
