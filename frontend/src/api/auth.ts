import type { LoginRequest, User } from "@/types/user";
import apiClient from "./client";
import type { AxiosRequestConfig } from "axios";

export const loginUser = async (credentials: LoginRequest): Promise<User> => {
  const params = new URLSearchParams();
  params.append("username", credentials.email);
  params.append("password", credentials.password);

  try {
    // パスから /v1 を削除
    const { data } = await apiClient.post<User>("/api/auth/token", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return data;
  } catch (err) {
    console.error("ログインAPI呼び出しエラー:", err);
    throw err;
  }
};

export const fetchCurrentUser = async (token?: string): Promise<User> => {
  const config: AxiosRequestConfig = {};
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }

  // パスから /v1 を削除
  const { data } = await apiClient.get<User>("/api/auth/users/me/", config);
  return data;
};

export const logoutUser = async (): Promise<void> => {
  // パスから /v1 を削除
  await apiClient.post("/api/auth/logout");
};
