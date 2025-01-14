"use client";

import { useEffect, useState } from "react";
import { Activity, activityService } from "@/services/activityService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  Key,
  CreditCard,
  FileText,
  Shield,
  LogIn,
  LogOut,
  Download,
  Trash,
  Edit,
  Eye,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const getActivityIcon = (activity: Activity) => {
  const iconProps = { className: "h-4 w-4" };

  switch (activity.action) {
    case "create":
    case "update":
      return <Edit {...iconProps} />;
    case "delete":
      return <Trash {...iconProps} />;
    case "view":
      return <Eye {...iconProps} />;
    case "export":
      return <Download {...iconProps} />;
    case "login":
      return <LogIn {...iconProps} />;
    case "logout":
      return <LogOut {...iconProps} />;
    default:
      return <Clock {...iconProps} />;
  }
};

const getResourceIcon = (activity: Activity) => {
  const iconProps = { className: "h-4 w-4" };

  switch (activity.resourceType) {
    case "password":
      return <Key {...iconProps} />;
    case "card":
      return <CreditCard {...iconProps} />;
    case "note":
      return <FileText {...iconProps} />;
    case "account":
      return <Shield {...iconProps} />;
    default:
      return null;
  }
};

const formatActivityDetails = (activity: Activity) => {
  return activity.details.charAt(0).toUpperCase() + activity.details.slice(1);
};

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getRecentActivities(50); // Daha fazla aktivite göster
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="container mx-auto space-y-6 p-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Activity History</h2>
        <p className="text-muted-foreground">
          View all your account activities and security events
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">All Activities</CardTitle>
          <CardDescription>
            A detailed list of all your activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-sm text-gray-500">Loading...</div>
            ) : activities.length === 0 ? (
              <div className="text-center text-sm text-gray-500">
                No activities found
              </div>
            ) : (
              activities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-center space-x-4 rounded-lg border p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    {getActivityIcon(activity)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {formatActivityDetails(activity)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {getResourceIcon(activity)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
