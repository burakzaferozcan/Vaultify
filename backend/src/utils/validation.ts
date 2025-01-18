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

export const validateCardData = (data: any, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.cardName !== undefined) {
    if (!data.cardName || typeof data.cardName !== 'string' || data.cardName.trim() === '') {
      errors.push('Card name is required');
    }
  }

  if (!isUpdate || data.cardholderName !== undefined) {
    if (!data.cardholderName || typeof data.cardholderName !== 'string' || data.cardholderName.trim() === '') {
      errors.push('Cardholder name is required');
    }
  }

  if (!isUpdate || data.cardNumber !== undefined) {
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      errors.push('Valid 16-digit card number is required');
    }
  }

  if (!isUpdate || data.expiryMonth !== undefined) {
    if (!data.expiryMonth || !/^(0[1-9]|1[0-2])$/.test(data.expiryMonth)) {
      errors.push('Valid expiry month (01-12) is required');
    }
  }

  if (!isUpdate || data.expiryYear !== undefined) {
    if (!data.expiryYear || !/^\d{2}$/.test(data.expiryYear)) {
      errors.push('Valid expiry year (YY) is required');
    }
  }

  if (!isUpdate || data.cvv !== undefined) {
    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      errors.push('Valid CVV (3-4 digits) is required');
    }
  }

  if (!isUpdate || data.cardType !== undefined) {
    if (!data.cardType || !['credit', 'debit', 'other'].includes(data.cardType)) {
      errors.push('Valid card type is required');
    }
  }

  if (!isUpdate || data.cardBrand !== undefined) {
    if (!data.cardBrand || typeof data.cardBrand !== 'string' || data.cardBrand.trim() === '') {
      errors.push('Card brand is required');
    }
  }

  return errors.length > 0 ? errors.join(', ') : null;
};
