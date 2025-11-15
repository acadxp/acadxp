import axios from "axios";

const api = axios.create({
  //   baseURL: "http://localhost:8000/api",
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitEmail = async (email: string) => {
  const respons = await api.post("/v1/waitlist/add", { email });
  return respons.data;
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/signup", payload);
  return response.data;
};
