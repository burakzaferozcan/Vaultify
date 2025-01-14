import axios from "@/lib/axios";

const API_URL = "/activity";

export interface Activity {
  _id: string;
  action: "create" | "update" | "delete" | "view" | "export" | "login" | "logout";
  resourceType: "password" | "card" | "note" | "account";
  details: string;
  createdAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ActivityStats {
  totalActivities: number;
  recentActivities: number;
  actionCounts: {
    [key: string]: number;
  };
}

export const activityService = {
  getRecentActivities: async (limit: number = 10): Promise<Activity[]> => {
    const response = await axios.get(`${API_URL}/recent?limit=${limit}`);
    return response.data;
  },

  getActivityStats: async (): Promise<ActivityStats> => {
    const response = await axios.get(`${API_URL}/stats`);
    return response.data;
  },

  getSecurityEvents: async (limit: number = 5): Promise<Activity[]> => {
    const response = await axios.get(`${API_URL}/security?limit=${limit}`);
    return response.data;
  },
};
