import { checkSchema } from "express-validator";

export const registerValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Geçerli bir email adresi giriniz",
    },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Şifre en az 6 karakter olmalıdır",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "İsim alanı gereklidir",
    },
    trim: true,
  },
});

export const loginValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Geçerli bir email adresi giriniz",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Şifre alanı gereklidir",
    },
  },
});

export const passwordValidation = checkSchema({
  title: {
    notEmpty: {
      errorMessage: "Başlık alanı gereklidir",
    },
    trim: true,
  },
  username: {
    notEmpty: {
      errorMessage: "Kullanıcı adı alanı gereklidir",
    },
    trim: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Şifre alanı gereklidir",
    },
  },
  url: {
    optional: true,
    isURL: {
      errorMessage: "Geçerli bir URL giriniz",
    },
    trim: true,
  },
});
