import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { PaginatedResult, PaginationParams } from "@/types/pagination";
import { User, CreateUserPayload, UpdateUserPayload } from "@/types/user";

export const userService = {
  async getUsers(params?: PaginationParams): Promise<PaginatedResult<User>> {
    return apiClient.get<PaginatedResult<User>>(ENDPOINTS.USERS.BASE, {
      params: {
        page: params?.page,
        page_size: params?.page_size,
        search: params?.search,
      },
    });
  },

  async getUserById(id: number): Promise<User> {
    return apiClient.get<User>(ENDPOINTS.USERS.BY_ID(id));
  },

  async createUser(payload: CreateUserPayload): Promise<User> {
    return apiClient.post<User>(ENDPOINTS.USERS.BASE, payload);
  },

  async updateUser(id: number, payload: UpdateUserPayload): Promise<User> {
    return apiClient.put<User>(ENDPOINTS.USERS.BY_ID(id), payload);
  },

  async deleteUser(id: number): Promise<void> {
    return apiClient.delete<void>(ENDPOINTS.USERS.BY_ID(id));
  },
};
