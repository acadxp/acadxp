import type { Session } from "better-auth/types";

export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

// flex on the right state later
export interface AuthState {
  session: Session | null;
  error: string | null;
  loading: boolean;
  setSession: (session: Session) => void;
  setError: (error: string) => void;
  logout: () => void;
}
