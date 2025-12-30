import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:8000/api/v1/auth",
  // baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL!,
});

// Hook to get the session
export const useSession = async () => {
  const { data } = await authClient.getSession();

  return data;
};
