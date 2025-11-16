import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { AxiosError } from "axios"; // removed unused import

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ErrorWithResponse {
  response?: { data?: { message?: string } };
}

export const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && error !== null) {
    const errObj = error as ErrorWithResponse;
    return errObj.response?.data?.message;
  }
  return undefined;
};
