"use client";

import { Password, PasswordFormData } from "@/types/password";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PasswordForm } from "./password-form";
import { passwordService } from "@/services/passwordService";
import { useToast } from "@/components/ui/use-toast";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  password?: Password;
  onSuccess: () => void;
}

export function PasswordModal({
  isOpen,
  onClose,
  password,
  onSuccess,
}: PasswordModalProps) {
  const { toast } = useToast();

  const handleSubmit = async (data: PasswordFormData) => {
    try {
      if (password) {
        // Update existing password
        await passwordService.updatePassword(password._id, data);
        toast({
          description: "Password updated successfully",
        });
      } else {
        // Create new password
        await passwordService.createPassword(data);
        toast({
          description: "Password created successfully",
        });
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || 
          (password ? "Failed to update password" : "Failed to create password"),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>
            {password ? "Edit Password" : "Add New Password"}
          </DialogTitle>
        </DialogHeader>
        <PasswordForm
          initialData={password}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
