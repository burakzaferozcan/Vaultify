import { Types } from "mongoose";
import { Activity, IActivity } from "../models/Activity";

export class ActivityService {
  static async createActivity(data: {
    userId: Types.ObjectId;
    action: IActivity["action"];
    resourceType: IActivity["resourceType"];
    details: string;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<IActivity> {
    const activity = new Activity(data);
    return activity.save();
  }

  static async getRecentActivities(
    userId: Types.ObjectId,
    limit: number = 10
  ): Promise<IActivity[]> {
    return Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  static async getActivityStats(userId: Types.ObjectId) {
    const totalActivities = await Activity.countDocuments({ userId });
    const recentActivities = await Activity.countDocuments({
      userId,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    const actionCounts = await Activity.aggregate([
      { $match: { userId } },
      { $group: { _id: "$action", count: { $sum: 1 } } },
    ]);

    return {
      totalActivities,
      recentActivities,
      actionCounts: Object.fromEntries(
        actionCounts.map((item) => [item._id, item.count])
      ),
    };
  }

  static async getSecurityEvents(
    userId: Types.ObjectId,
    limit: number = 5
  ): Promise<IActivity[]> {
    return Activity.find({
      userId,
      action: { $in: ["login", "logout", "export"] },
    })
      .sort({ createdAt: -1 })
      .limit(limit);
  }
}
