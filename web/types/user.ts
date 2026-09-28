export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: string;
}

export interface UpdateUserPayload {
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  is_active?: boolean;
}
