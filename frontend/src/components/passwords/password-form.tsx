"use client";

import { useState } from "react";
import { Password, PasswordFormData } from "@/types/password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFormProps {
  initialData?: Password;
  onSubmit: (data: PasswordFormData) => void;
  onCancel: () => void;
}

export function PasswordForm({ initialData, onSubmit, onCancel }: PasswordFormProps) {
  const [formData, setFormData] = useState<PasswordFormData>({
    title: initialData?.title || "",
    username: initialData?.username || "",
    password: initialData?.password || "",
    url: initialData?.url || "",
    notes: initialData?.notes || "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., Gmail Account"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="e.g., john.doe@gmail.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="pr-10"
            required
          />
          <Button
            type="button"
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

      <div className="space-y-2">
        <Label htmlFor="url">Website URL (optional)</Label>
        <Input
          id="url"
          name="url"
          type="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="e.g., https://gmail.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any additional notes..."
          className="h-24 resize-none"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Password" : "Add Password"}
        </Button>
      </div>
    </form>
  );
}
