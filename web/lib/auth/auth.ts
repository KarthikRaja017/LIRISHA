import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { AuthTokenData, LoginCredentials, RegisterPayload } from "@/types/auth";
import { User } from "@/types/user";
import { setToken, removeToken } from "./token";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthTokenData> {
    const data = await apiClient.post<AuthTokenData>(ENDPOINTS.AUTH.LOGIN, credentials);
    if (data.access_token) {
      setToken(data.access_token);
    }
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthTokenData> {
    const data = await apiClient.post<AuthTokenData>(ENDPOINTS.AUTH.REGISTER, payload);
    if (data.access_token) {
      setToken(data.access_token);
    }
    return data;
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(ENDPOINTS.AUTH.ME);
  },

  async updateCurrentUser(payload: { email?: string; password?: string; first_name?: string; last_name?: string }): Promise<User> {
    return apiClient.put<User>(ENDPOINTS.AUTH.ME, payload);
  },

  logout(): void {
    removeToken();
  },
};
