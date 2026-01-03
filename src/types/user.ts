export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}
export enum UserRole {
  STUDENT,
  TEACHER,
  ADMIN,
}
export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  error: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setAuthError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}
