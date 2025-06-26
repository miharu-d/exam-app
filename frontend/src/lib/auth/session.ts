import { cache } from "react";
import { cookies } from "next/headers";
import { fetchCurrentUser } from "@/api/auth";
import type { User } from "@/types/user";

/**
 * サーバーコンポーネントやAPIルートで、リクエストのCookieから
 * 認証トークンを読み取り、現在のユーザー情報を取得
 * Reactのcache()でラップされているため、同じリクエスト内では一度しか実行されない
 */
export const getServerUser = cache(async (): Promise<User | null> => {
  const tokenCookie = cookies().get("authToken")?.value;

  if (!tokenCookie) {
    return null;
  }

  try {
    const user = await fetchCurrentUser(tokenCookie);
    return user;
  } catch (error) {
    // トークンが無効な場合やAPIエラーの場合はnullを返す
    return null;
  }
});
