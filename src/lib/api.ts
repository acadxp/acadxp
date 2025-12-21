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
}: RegisterUserPayload) => {
  const response = await api.post("/v1/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};

export const checkEmailAvailability = async (email: string) => {
  const response = await api.get(`/v1/profile/check-email?email=${email}`);

  const isAvailable =
    response.data.message === "Email is available" ? true : false;
  return isAvailable;
};

export const checkUsernameAvailability = async (username: string) => {
  const response = await api.get(
    `/v1/profile/check-username?username=${username}`
  );

  const isAvailable =
    response.data.message === "Username is available" ? true : false;
  return isAvailable;
};
