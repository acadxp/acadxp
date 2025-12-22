import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  // baseURL: "http://localhost:8000/api/v1/auth",
  baseURL: process.env.NEXT_BETTER_AUTH_BASE_URL,
});
