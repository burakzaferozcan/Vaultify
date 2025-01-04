"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Key, Copy, Edit, Trash } from "lucide-react";

interface Password {
  id: string;
  title: string;
  username: string;
  website: string;
  lastUpdated: string;
}

export default function PasswordsPage() {
  const [passwords] = useState<Password[]>([
    {
      id: "1",
      title: "Gmail Account",
      username: "john.doe@gmail.com",
      website: "gmail.com",
      lastUpdated: "2024-01-04",
    },
    {
      id: "2",
      title: "GitHub Account",
      username: "johndoe",
      website: "github.com",
      lastUpdated: "2024-01-03",
    },
    {
      id: "3",
      title: "Netflix Account",
      username: "john.doe@email.com",
      website: "netflix.com",
      lastUpdated: "2024-01-02",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Passwords</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your saved passwords
          </p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Password
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search passwords..."
            className="w-full rounded-md border border-gray-800 bg-gray-800 pl-9 pr-4 py-2 focus:border-purple-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {passwords.map((password) => (
          <Card key={password.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium flex items-center">
                <Key className="mr-2 h-4 w-4 text-purple-600" />
                {password.title}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1">
                <div className="text-sm">
                  <span className="font-medium">Username:</span>{" "}
                  {password.username}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Website:</span>{" "}
                  {password.website}
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {password.lastUpdated}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
