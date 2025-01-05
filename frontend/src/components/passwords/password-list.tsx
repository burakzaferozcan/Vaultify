"use client";

import { useState } from "react";
import { Password, PasswordListProps } from "@/types/password";
import { PasswordItem } from "./password-item";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function PasswordList({ passwords, onEdit, onDelete }: PasswordListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPasswords = passwords.filter((password) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      password.title.toLowerCase().includes(searchLower) ||
      password.username.toLowerCase().includes(searchLower) ||
      (password.url?.toLowerCase() || "").includes(searchLower)
    );
  });

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
        <Input
          type="text"
          placeholder="Search passwords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Password List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPasswords.map((password) => (
          <PasswordItem
            key={password._id}
            password={password}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredPasswords.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed border-gray-700 bg-gray-800/50 p-8 text-center">
          <div className="text-lg font-medium text-gray-400">No passwords found</div>
          <div className="text-sm text-gray-500">
            {searchQuery
              ? "Try adjusting your search query"
              : "Add your first password to get started"}
          </div>
        </div>
      )}
    </div>
  );
}
