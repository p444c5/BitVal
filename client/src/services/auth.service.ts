import { toast } from "sonner";
import api, { setAccessToken } from "@/api";
import type {  AxiosError } from "axios";

export const adminLogin = async (username: string, password: string) : Promise<boolean>=> {
  const toastId = toast.loading("Verifying credentials...");

  try {
    const response = await api.post<{ accessToken: string }>("/auth/login", { username, password });
    const { accessToken } = response.data;

    if (accessToken) {
      setAccessToken(accessToken);
      toast.success("Welcome back, Admin!", { id: toastId });
      return true; 
    }
    return false;
  } catch (error) {
    console.error("Login attempt failed:", error);
    const err = error as AxiosError<{message: string}>;
    toast.error(err.response?.data?.message || "Login failed.", { id: toastId });
    return false; 
  }
};