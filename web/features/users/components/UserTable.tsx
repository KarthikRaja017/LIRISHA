"use client";

import React from "react";
import { User } from "@/types/user";
import { Table, Column } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";

export interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const columns: Column<User>[] = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      cell: (u) => (
        <span className="font-medium text-gray-900">
          {u.first_name} {u.last_name}
        </span>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      cell: (u) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 uppercase">
          {u.role}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (u) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            u.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {u.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (u) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(u)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(u.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={users} keyExtractor={(u) => u.id} isLoading={isLoading} />;
};
