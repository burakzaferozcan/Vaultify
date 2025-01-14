import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Plus, Download, Upload, RefreshCw, Wand2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function QuickActions() {
  const router = useRouter();

  const actions: QuickAction[] = [
    {
      id: "add-password",
      title: "Add Password",
      description: "Store a new password securely",
      icon: <Plus className="h-4 w-4" />,
      onClick: () => router.push("/dashboard/passwords?action=new"),
    },
    {
      id: "generate-password",
      title: "Generate Password",
      description: "Create a strong random password",
      icon: <Wand2 className="h-4 w-4" />,
      onClick: () => router.push("/dashboard/passwords?action=generate"),
    },
    {
      id: "export-data",
      title: "Export Data",
      description: "Download your passwords",
      icon: <Download className="h-4 w-4" />,
      onClick: () => router.push("/dashboard/passwords?action=export"),
    },
    {
      id: "import-data",
      title: "Import Data",
      description: "Import passwords from file",
      icon: <Upload className="h-4 w-4" />,
      onClick: () => router.push("/dashboard/passwords?action=import"),
    },
    {
      id: "check-passwords",
      title: "Check Passwords",
      description: "Analyze password strength",
      icon: <RefreshCw className="h-4 w-4" />,
      onClick: () => router.push("/dashboard/security"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        <CardDescription>Common tasks and operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="flex h-auto w-full items-center gap-3 p-4 text-left"
              onClick={action.onClick}
            >
              <div className="rounded-full bg-primary/10 p-2 dark:bg-primary/20">
                {action.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{action.title}</div>
                <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
