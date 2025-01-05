"use client";

import { useState } from "react";
import { Password, PasswordItemProps } from "@/types/password";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Eye, EyeOff, Globe, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function PasswordItem({ password, onEdit, onDelete }: PasswordItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: "password" | "username") => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: `${type === "password" ? "Password" : "Username"} copied to clipboard`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy to clipboard",
      });
    }
  };

  return (
    <Card className="overflow-hidden bg-gray-800/50 p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-medium text-white">{password.title}</h3>
          <p className="text-sm text-gray-400">{password.username}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => copyToClipboard(password.username, "username")}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Username
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => copyToClipboard(password.password, "password")}>
              <Copy className="mr-2 h-4 w-4" />
              Copy Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(password)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => onDelete(password._id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password.password}
              readOnly
              className="w-full rounded bg-gray-700 px-3 py-1 text-sm text-gray-300"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {password.url && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Globe className="h-4 w-4" />
            <a
              href={password.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400"
            >
              {new URL(password.url).hostname}
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
