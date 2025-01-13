import { Request, Response } from "express";
import { Activity } from "../models/Activity";
import mongoose from "mongoose";

export const ActivityController = {
  getRecentActivities: async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 10;
      const userId = new mongoose.Types.ObjectId(req.user._id);

      const activities = await Activity.find({ userId })
        .sort({ createdAt: -1 })
        .limit(limit);
      res.json(activities);
    } catch (error) {
      console.error("Error getting recent activities:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getActivityStats: async (req: Request, res: Response) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.user._id);

      const totalActivities = await Activity.countDocuments({ userId });
      const recentActivities = await Activity.countDocuments({
        userId,
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      });

      const actionCounts = await Activity.aggregate([
        { $match: { userId } },
        { $group: { _id: "$action", count: { $sum: 1 } } },
      ]);

      const stats = {
        totalActivities,
        recentActivities,
        actionCounts: Object.fromEntries(
          actionCounts.map((item) => [item._id, item.count])
        ),
      };

      res.json(stats);
    } catch (error) {
      console.error("Error getting activity stats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getSecurityEvents: async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 5;
      const userId = new mongoose.Types.ObjectId(req.user._id);

      const securityEvents = await Activity.find({
        userId,
        action: { $in: ["login", "logout", "export"] },
      })
        .sort({ createdAt: -1 })
        .limit(limit);
      res.json(securityEvents);
    } catch (error) {
      console.error("Error getting security events:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
