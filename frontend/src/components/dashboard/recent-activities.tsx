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
  ArrowRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activityService.getRecentActivities(5);
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
          <CardDescription>Your latest security events and actions</CardDescription>
        </div>
        <Button
          variant="ghost"
          className="text-sm"
          onClick={() => router.push("/dashboard/activities")}
        >
          View All
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-sm text-gray-500">Loading...</div>
          ) : activities.length === 0 ? (
            <div className="text-center text-sm text-gray-500">
              No recent activities
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
  );
}
