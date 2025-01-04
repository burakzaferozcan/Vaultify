"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, CreditCard, FileText, AlertTriangle } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Passwords",
      value: "12",
      icon: Key,
      color: "text-violet-500",
      bgColor: "bg-violet-100",
    },
    {
      title: "Payment Cards",
      value: "3",
      icon: CreditCard,
      color: "text-pink-700",
      bgColor: "bg-pink-100",
    },
    {
      title: "Secure Notes",
      value: "5",
      icon: FileText,
      color: "text-orange-700",
      bgColor: "bg-orange-100",
    },
    {
      title: "Weak Passwords",
      value: "2",
      icon: AlertTriangle,
      color: "text-red-700",
      bgColor: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Here&apos;s an overview of your vault
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full ${stat.bgColor} p-2 ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-500 dark:text-gray-400">
              Your recent password changes and updates will appear here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Security Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                <span className="text-2xl font-bold">A+</span>
              </div>
              <div>
                <div className="text-lg font-semibold">Excellent</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Your passwords are strong and secure
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
