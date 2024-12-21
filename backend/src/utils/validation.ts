import { body, ValidationChain } from "express-validator";

export const registerValidation: ValidationChain[] = [
  body("email").isEmail().withMessage("Geçerli bir email adresi giriniz"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Şifre en az 6 karakter olmalıdır"),
  body("name").notEmpty().withMessage("İsim alanı gereklidir"),
];

export const loginValidation: ValidationChain[] = [
  body("email").isEmail().withMessage("Geçerli bir email adresi giriniz"),
  body("password").notEmpty().withMessage("Şifre alanı gereklidir"),
];

export const passwordValidation: ValidationChain[] = [
  body("title").notEmpty().withMessage("Başlık alanı gereklidir"),
  body("username").notEmpty().withMessage("Kullanıcı adı alanı gereklidir"),
  body("password").notEmpty().withMessage("Şifre alanı gereklidir"),
  body("url").optional().isURL().withMessage("Geçerli bir URL giriniz"),
];
