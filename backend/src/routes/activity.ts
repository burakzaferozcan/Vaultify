import { RequestHandler, Router } from "express";
import { ActivityController } from "../controllers/activityController";
import { auth } from "../middleware/auth";

const router = Router();

// Tüm route'lar için authentication gerekli
router.use(auth);

const handleGetRecent: RequestHandler = async (req, res) => {
  await ActivityController.getRecentActivities(req, res);
};

const handleGetStats: RequestHandler = async (req, res) => {
  await ActivityController.getActivityStats(req, res);
};

const handleGetSecurityEvents: RequestHandler = async (req, res) => {
  await ActivityController.getSecurityEvents(req, res);
};

// Aktivite route'ları
router.get("/recent", handleGetRecent);
router.get("/stats", handleGetStats);
router.get("/security", handleGetSecurityEvents);

export default router;
