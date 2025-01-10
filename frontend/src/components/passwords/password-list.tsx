"use client";

import { useState, forwardRef, useEffect, useImperativeHandle } from "react";
import { Password } from "@/types/password";
import { PasswordItem } from "./password-item";
import { Input } from "@/components/ui/input";
import { Search, Plus, Wand2 } from "lucide-react";
import { passwordService } from "@/services/passwordService";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PasswordGenerator } from "./password-generator";

interface PasswordListProps {
  onEdit: (password: Password) => void;
  onDelete?: (id: string) => void;
  onAdd?: () => void;
}

export interface PasswordListRef {
  refreshPasswords: () => Promise<void>;
}

const PasswordList = forwardRef<PasswordListRef, PasswordListProps>(
  ({ onEdit, onDelete, onAdd }, ref) => {
    const [passwords, setPasswords] = useState<Password[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [showGenerator, setShowGenerator] = useState(false);
    const { toast } = useToast();

    const fetchPasswords = async () => {
      try {
        setLoading(true);
        const data = await passwordService.getAllPasswords();
        setPasswords(data);
      } catch (error: any) {
        console.error("Error fetching passwords:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to fetch passwords",
        });
      } finally {
        setLoading(false);
      }
    };

    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        return fetchPasswords();
      }

      try {
        setLoading(true);
        const data = await passwordService.searchPasswords(searchQuery);
        setPasswords(data);
      } catch (error: any) {
        console.error("Error searching passwords:", error);
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
        await fetchPasswords();
        toast({
          description: "Password deleted successfully",
        });
      } catch (error: any) {
        console.error("Error deleting password:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.response?.data?.error || "Failed to delete password",
        });
      }
    };

    const handleGeneratedPassword = async (password: string) => {
      try {
        await navigator.clipboard.writeText(password);
        setShowGenerator(false);
        toast({
          description: "Generated password copied to clipboard",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Failed to copy password to clipboard",
        });
      }
    };

    useEffect(() => {
      fetchPasswords();
    }, []);

    useEffect(() => {
      const delaySearch = setTimeout(() => {
        handleSearch();
      }, 500);

      return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    useImperativeHandle(ref, () => ({
      refreshPasswords: fetchPasswords,
    }));

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Passwords</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => setShowGenerator(true)}
            >
              <Wand2 className="h-4 w-4" />
              Quick Generate
            </Button>
            {onAdd && (
              <Button onClick={onAdd} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Password
              </Button>
            )}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search passwords..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={showGenerator} onOpenChange={setShowGenerator}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Strong Password</DialogTitle>
              <DialogDescription>
                Generate a strong password and copy it to clipboard
              </DialogDescription>
            </DialogHeader>
            <PasswordGenerator onGenerate={handleGeneratedPassword} />
          </DialogContent>
        </Dialog>

        <div className="space-y-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : passwords.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery
                ? "No passwords found matching your search"
                : "No passwords added yet"}
            </div>
          ) : (
            passwords.map((password) => (
              <PasswordItem
                key={password._id}
                password={password}
                onEdit={() => onEdit(password)}
                onDelete={
                  onDelete
                    ? () => onDelete(password._id)
                    : () => handleDelete(password._id)
                }
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
