"use client";

import React, { useState, useEffect } from "react";
import { User, CreateUserPayload, UpdateUserPayload } from "@/types/user";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  onSubmit: (data: CreateUserPayload | UpdateUserPayload) => Promise<void>;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  user,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("user");
  const [isActive, setIsActive] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setRole(user.role);
      setIsActive(user.is_active);
      setPassword("");
    } else {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setRole("user");
      setIsActive(true);
    }
    setError(null);
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (user) {
        await onSubmit({
          email,
          first_name: firstName,
          last_name: lastName,
          role,
          is_active: isActive,
        });
      } else {
        await onSubmit({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          role,
        });
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? "Edit User" : "Create User"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 text-xs bg-red-100 text-red-700 rounded-md">{error}</div>}

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {!user && (
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText="Minimum 8 characters"
          />
        )}

        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Administrator" },
          ]}
        />

        {user && (
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Active Account
            </label>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            {user ? "Save Changes" : "Create User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
