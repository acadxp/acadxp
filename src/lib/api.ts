import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const checkEmailAvailability = async (email: string) => {
  const response = await api.get(`/v1/users/check-email?email=${email}`);

  const isAvailable =
    response.data.message === "Email is available" ? true : false;
  return isAvailable;
};

export const checkUsernameAvailability = async (username: string) => {
  const response = await api.get(
    `/v1/users/profile/check-username?username=${username}`
  );

  const isAvailable =
    response.data.message === "Username is available" ? true : false;
  return isAvailable;
};
