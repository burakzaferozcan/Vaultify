import { RequestHandler, Router } from "express";
import { PasswordController } from "../controllers/passwordController";
import { auth } from "../middleware/auth";

const router = Router();

// Tüm route'lar için authentication gerekli
router.use(auth);

const handleCreate: RequestHandler = async (req, res) => {
  await PasswordController.create(req, res);
};

const handleGetAll: RequestHandler = async (req, res) => {
  await PasswordController.getAll(req, res);
};

const handleSearch: RequestHandler = async (req, res) => {
  await PasswordController.search(req, res);
};

const handleExport: RequestHandler = async (req, res) => {
  await PasswordController.export(req, res);
};

const handleGetById: RequestHandler = async (req, res) => {
  await PasswordController.getById(req, res);
};

const handleUpdate: RequestHandler = async (req, res) => {
  await PasswordController.update(req, res);
};

const handleDelete: RequestHandler = async (req, res) => {
  await PasswordController.delete(req, res);
};

// Şifre yönetimi route'ları
router.post("/", handleCreate);
router.get("/", handleGetAll);
router.get("/search", handleSearch);
router.get("/export", handleExport);
router.get("/:id", handleGetById);
router.put("/:id", handleUpdate);
router.delete("/:id", handleDelete);

export default router;
