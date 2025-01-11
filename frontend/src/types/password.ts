import { z } from "zod";

export interface Password {
  _id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const passwordFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  url: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
});

export type PasswordFormData = z.infer<typeof passwordFormSchema>;

export interface PasswordListProps {
  passwords: Password[];
  onEdit: (password: Password) => void;
  onDelete: (id: string) => void;
}

export interface PasswordItemProps {
  password: Password;
  onEdit: (password: Password) => void;
  onDelete: (id: string) => void;
}
