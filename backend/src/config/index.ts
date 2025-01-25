import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/vaultify',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  aesSecretKey: process.env.AES_SECRET_KEY || 'your_aes_secret_key',
  emailAddress: process.env.EMAIL_ADRESS || '',
  emailPassword: process.env.EMAIL_PASSWORD || ''
};
