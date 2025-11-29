export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface LoginUserPayload {
  email: string;
  password: string;
}

export interface UserInfos {
  id?: string;
  email?: string;
  name?: string;
  username?: string;
}

// flex on the right state later
export interface AuthState {
  user: UserInfos | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  setUser: (user: UserInfos) => void;
  setToken: (token: string) => void;
  setError: (error: string) => void;
  logout: () => void;
}
