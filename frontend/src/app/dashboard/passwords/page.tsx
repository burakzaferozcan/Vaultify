"use client";

import { useState, useRef } from "react";
import { Password } from "@/types/password";
import { PasswordList } from "@/components/passwords/password-list";
import { PasswordModal } from "@/components/passwords/password-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PasswordListRef } from "@/components/passwords/password-list";

export default function PasswordsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState<Password | undefined>(
    undefined
  );
  const passwordListRef = useRef<PasswordListRef>(null);

  const handleAddPassword = () => {
    setSelectedPassword(undefined);
    setIsModalOpen(true);
  };

  const handleEditPassword = (password: Password) => {
    setSelectedPassword(password);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPassword(undefined);
  };

  const handleSuccess = () => {
    handleCloseModal();
    passwordListRef.current?.refreshPasswords();
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Passwords</h1>
        <Button onClick={handleAddPassword}>
          <Plus className="mr-2 h-4 w-4" />
          Add Password
        </Button>
      </div>

      <PasswordList
        ref={passwordListRef}
        onEdit={handleEditPassword}
      />

      <PasswordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        password={selectedPassword}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
