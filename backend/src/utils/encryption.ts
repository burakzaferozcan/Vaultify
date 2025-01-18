import CryptoJS from "crypto-js";
import { config } from "../config/environment";

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, config.aesSecretKey).toString();
};

export const decryptPassword = (encryptedPassword: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, config.aesSecretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, config.aesSecretKey).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, config.aesSecretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = await import("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hashedPassword);
};
