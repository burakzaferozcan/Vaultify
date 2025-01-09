"use client";

import { useState } from "react";
import { Password } from "@/types/password";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Globe, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PasswordItemProps {
  password: Password;
  onEdit: (password: Password) => void;
  onDelete: (id: string) => void;
}

export function PasswordItem({
  password,
  onEdit,
  onDelete,
}: PasswordItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (
    text: string,
    type: "password" | "username"
  ) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: `${
          type === "password" ? "Password" : "Username"
        } copied to clipboard`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to copy to clipboard",
      });
    }
  };

  return (
    <div className="flex items-center justify-between space-x-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="truncate text-sm font-medium text-white">
            {password.title}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="truncate text-sm text-gray-400">{password.username}</p>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => copyToClipboard(password.username, "username")}
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy username</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <p className="truncate text-sm text-gray-400">
            {showPassword ? password.password : "••••••••"}
          </p>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-3 w-3" />
              ) : (
                <Eye className="h-3 w-3" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => copyToClipboard(password.password, "password")}
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy password</span>
            </Button>
          </div>
        </div>
        {password.url && (
          <a
            href={password.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs text-purple-400 hover:text-purple-300"
          >
            <Globe className="h-3 w-3" />
            <span className="truncate">{password.url}</span>
          </a>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-700 hover:text-white"
          onClick={() => onEdit(password)}
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit password</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-gray-700 text-red-400 hover:text-red-400"
          onClick={() => onDelete(password._id)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete password</span>
        </Button>
      </div>
    </div>
  );
}
