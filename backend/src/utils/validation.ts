import { checkSchema } from "express-validator";

export const registerValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Enter a valid email address",
    },
    normalizeEmail: true,
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "Name field is required",
    },
    trim: true,
  },
});

export const loginValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Enter a valid email address",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Email field is required",
    },
  },
});

export const passwordValidation = checkSchema({
  title: {
    notEmpty: {
      errorMessage: "Header field is required",
    },
    trim: true,
  },
  username: {
    notEmpty: {
      errorMessage: "Username field is required",
    },
    trim: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Password field is required",
    },
  },
  url: {
    optional: true,
    isURL: {
      errorMessage: "Enter a valid URL",
    },
    trim: true,
  },
});
