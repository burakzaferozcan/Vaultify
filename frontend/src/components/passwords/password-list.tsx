"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Password } from "@/types/password";
import { PasswordItem } from "./password-item";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { passwordService } from "@/services/passwordService";
import { useToast } from "@/components/ui/use-toast";

interface PasswordListProps {
  onEdit: (password: Password) => void;
  onDelete?: (id: string) => Promise<void>;
}

export interface PasswordListRef {
  fetchPasswords: () => Promise<void>;
}

const PasswordList = forwardRef<PasswordListRef, PasswordListProps>(
  ({ onEdit, onDelete }, ref) => {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchPasswords = async () => {
      try {
        setLoading(true);
        const data = await passwordService.getAllPasswords();
        setPasswords(data);
      } catch (error: any) {
        console.error('Error fetching passwords:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to fetch passwords",
        });
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      fetchPasswords,
    }));

    const handleSearch = async () => {
      try {
        setLoading(true);
        const data = await passwordService.searchPasswords(searchQuery);
        setPasswords(data);
      } catch (error: any) {
        console.error('Error searching passwords:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to search passwords",
        });
      } finally {
        setLoading(false);
      }
    };

    const handleDelete = async (id: string) => {
      try {
        await passwordService.deletePassword(id);
        await fetchPasswords(); // Listeyi yenile
        toast({
          description: "Password deleted successfully",
        });
      } catch (error: any) {
        console.error('Error deleting password:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to delete password",
        });
      }
    };

    useEffect(() => {
      fetchPasswords();
    }, []);

    useEffect(() => {
      if (searchQuery) {
        const delayDebounceFn = setTimeout(() => {
          handleSearch();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
      } else {
        fetchPasswords();
      }
    }, [searchQuery]);

    if (loading) {
      return (
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent"></div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search passwords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="space-y-2">
          {passwords.length === 0 ? (
            <div className="text-center text-gray-500">No passwords found</div>
          ) : (
            passwords.map((password) => (
              <PasswordItem
                key={password._id}
                password={password}
                onEdit={() => onEdit(password)}
                onDelete={onDelete ? () => onDelete(password._id) : () => handleDelete(password._id)}
              />
            ))
          )}
        </div>
      </div>
    );
  }
);

PasswordList.displayName = "PasswordList";

export { PasswordList };
