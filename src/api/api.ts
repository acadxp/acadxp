import axios from "axios";

const api = axios.create({
  //   baseURL: "http://localhost:8000/api",
  baseURL: "https://acadxp-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const submitEmail = async (email: string) => {
  const respons = await api.post("/v1/waitlist/add", { email });
  return respons.data;
};
