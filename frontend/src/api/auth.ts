import type { LoginRequest, AuthToken, User } from "@/types";
import apiClient from "./client";

// ログイン処理
export async function loginUser(credetials: LoginRequest): Promise<AuthToken> {
  const formBody = new URLSearchParams();

  formBody.append("username", credetials.email);
  formBody.append("password", credetials.password);

  try {
    const response = await apiClient.post<AuthToken>(
      "/api/auth/token",
      formBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("ログインAPI呼び出しエラー:", err);
    throw err;
  }
}

export async function fetchCurrentUser(token: string): Promise<User> {
  try {
    const response = await apiClient.get<User>("/api/auth/users/me", {
      headers: {
        Authrization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("ユーザー情報取得API呼び出しエラー:", err);
    throw err;
  }
}
