import { Password, PasswordFormData } from "@/types/password";
import api from "./api";

export const passwordService = {
  // Tüm şifreleri getir
  async getAllPasswords(): Promise<Password[]> {
    const response = await api.get("/passwords");
    return response.data;
  },

  // Belirli bir şifreyi getir
  async getPasswordById(id: string): Promise<Password> {
    const response = await api.get(`/passwords/${id}`);
    return response.data;
  },

  // Yeni şifre oluştur
  async createPassword(data: PasswordFormData): Promise<Password> {
    const response = await api.post("/passwords", data);
    return response.data.password;
  },

  // Şifre güncelle
  async updatePassword(id: string, data: PasswordFormData): Promise<Password> {
    const response = await api.put(`/passwords/${id}`, data);
    return response.data.password;
  },

  // Şifre sil
  async deletePassword(id: string): Promise<void> {
    await api.delete(`/passwords/${id}`);
  },

  // Şifre ara
  async searchPasswords(query: string): Promise<Password[]> {
    const response = await api.get("/passwords/search", {
      params: { query },
    });
    return response.data;
  },
};
