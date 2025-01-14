"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: StatsCardProps) {
  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case "up":
        return "↑";
      case "down":
        return "↓";
      default:
        return "→";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-purple-100 p-1.5 dark:bg-purple-900/20">
          <Icon className="h-full w-full text-purple-600 dark:text-purple-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-3">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <div className={`text-sm ${getTrendColor(trend)}`}>
              {getTrendIcon(trend)}
            </div>
          )}
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
