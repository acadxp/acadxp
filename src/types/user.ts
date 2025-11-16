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
