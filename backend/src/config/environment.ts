import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/vaultify",
  jwtSecret: process.env.JWT_SECRET || "default_jwt_secret",
  aesSecretKey: process.env.AES_SECRET_KEY || "default_aes_secret",
};

// Environment variables type checking
const requiredEnvVars = ["JWT_SECRET", "AES_SECRET_KEY", "MONGODB_URI"];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} environment variable is not set`);
  }
}
