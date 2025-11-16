import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: any) => {
  // if (error instanceof Error) return error.message;

  return error.response?.data?.message;
};
