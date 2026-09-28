"use client";

import { useState, useEffect, useCallback } from "react";
import { User, CreateUserPayload, UpdateUserPayload } from "@/types/user";
import { PaginationMeta } from "@/types/pagination";
import { userService } from "../services/userService";
import { useDebounce } from "@/hooks/useDebounce";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    page_size: 10,
    total: 0,
    total_pages: 0,
  });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (pageNumber = 1, searchQuery = debouncedSearch) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await userService.getUsers({
        page: pageNumber,
        page_size: 10,
        search: searchQuery,
      });
      setUsers(res.items);
      setPagination(res.pagination);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchUsers(1, debouncedSearch);
  }, [debouncedSearch, fetchUsers]);

  const changePage = (newPage: number) => {
    fetchUsers(newPage, debouncedSearch);
  };

  const createUser = async (payload: CreateUserPayload) => {
    await userService.createUser(payload);
    await fetchUsers(pagination.page, debouncedSearch);
  };

  const updateUser = async (id: number, payload: UpdateUserPayload) => {
    await userService.updateUser(id, payload);
    await fetchUsers(pagination.page, debouncedSearch);
  };

  const deleteUser = async (id: number) => {
    await userService.deleteUser(id);
    await fetchUsers(pagination.page, debouncedSearch);
  };

  return {
    users,
    pagination,
    search,
    setSearch,
    isLoading,
    error,
    changePage,
    refetch: () => fetchUsers(pagination.page, debouncedSearch),
    createUser,
    updateUser,
    deleteUser,
  };
}
