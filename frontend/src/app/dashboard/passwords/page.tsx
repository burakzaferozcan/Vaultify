"use client";

import { useState, useEffect } from "react";
import { Password } from "@/types/password";
import { PasswordList } from "@/components/passwords/password-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function PasswordsPage() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get("/api/passwords");
      setPasswords(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch passwords",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (password: Password) => {
    // TODO: Implement edit functionality
    console.log("Edit password:", password);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/passwords/${id}`);
      setPasswords((prev) => prev.filter((p) => p._id !== id));
      toast({
        description: "Password deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete password",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Passwords</h1>
          <p className="text-sm text-gray-400">
            Manage your saved passwords securely
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Password
        </Button>
      </div>

      <PasswordList
        passwords={passwords}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
