"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/types/user";
import { AuthState, LoginCredentials, RegisterPayload } from "@/types/auth";
import { authService } from "@/lib/auth/auth";
import { getToken } from "@/lib/auth/token";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<void>;
  updateUser: (payload: { email?: string; password?: string; first_name?: string; last_name?: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const user = await authService.getCurrentUser();
      setState({ user, token, isAuthenticated: true, isLoading: false });
    } catch {
      authService.logout();
      setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const authData = await authService.login(credentials);
      setState({
        user: authData.user,
        token: authData.access_token,
        isAuthenticated: true,
        isLoading: false,
      });
      return authData.user;
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (payload: RegisterPayload) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const authData = await authService.register(payload);
      setState({
        user: authData.user,
        token: authData.access_token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const updateUser = async (payload: { email?: string; password?: string; first_name?: string; last_name?: string }) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const updatedUser = await authService.updateCurrentUser(payload);
      setState((prev) => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, updateUser, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
