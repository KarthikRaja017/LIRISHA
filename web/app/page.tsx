"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { UserTable } from "@/features/users/components/UserTable";
import { UserFormModal } from "@/features/users/components/UserFormModal";
import { Pagination } from "@/components/ui/Pagination";
import { ErrorState } from "@/components/ui/ErrorState";
import { useUsers } from "@/features/users/hooks/useUsers";
import { User, CreateUserPayload, UpdateUserPayload } from "@/types/user";

export default function UsersPage() {
  const {
    users,
    pagination,
    search,
    setSearch,
    isLoading,
    error,
    changePage,
    refetch,
    createUser,
    updateUser,
    deleteUser,
  } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  const handleModalSubmit = async (payload: CreateUserPayload | UpdateUserPayload) => {
    if (selectedUser) {
      await updateUser(selectedUser.id, payload as UpdateUserPayload);
    } else {
      await createUser(payload as CreateUserPayload);
    }
  };

  return (
    <div className="space-y-6">
      <Header
        title="Users Management"
        description="Sample feature module demonstrating end-to-end CRUD with Next.js, Flask & raw PostgreSQL."
        action={
          <Button variant="primary" onClick={handleOpenCreate}>
            + Add New User
          </Button>
        }
      />

      <div className="flex items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : (
        <div className="space-y-4">
          <UserTable
            users={users}
            isLoading={isLoading}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
          <Pagination meta={pagination} onPageChange={changePage} />
        </div>
      )}

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
