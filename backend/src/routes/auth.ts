import { Router } from "express";
import { RequestHandler } from "express";
import { AuthController } from "../controllers/authController";
import { validate } from "../middleware/validation";
import { registerValidation, loginValidation } from "../utils/validation";
import { auth } from "../middleware/auth";

const router = Router();

const handleRegister: RequestHandler = async (req, res) => {
  await AuthController.register(req, res);
};

const handleLogin: RequestHandler = async (req, res) => {
  await AuthController.login(req, res);
};

const handleProfile: RequestHandler = async (req, res) => {
  await AuthController.getProfile(req, res);
};

// POST /api/auth/register
router.post("/register", validate(registerValidation), handleRegister);

// POST /api/auth/login
router.post("/login", validate(loginValidation), handleLogin);

// GET /api/auth/profile
router.get("/profile", auth, handleProfile);

export default router;
