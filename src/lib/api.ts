import axios from "axios";
import type { RegisterUserPayload, LoginUserPayload } from "../types/user";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitEmail = async (email: string) => {
  const respons = await api.post("/v1/waitlist/add", { email });
  return respons.data;
};

export const registerUser = async ({
  name,
  email,
  password,
  username,
}: RegisterUserPayload) => {
  const response = await api.post("/v1/auth/signup", {
    name,
    email,
    password,
    username,
  });
  return response.data;
};

export const loginUser = async ({ email, password }: LoginUserPayload) => {
  const response = await api.post("/v1/auth/login", {
    email,
    password,
  });
  return response.data;
};
