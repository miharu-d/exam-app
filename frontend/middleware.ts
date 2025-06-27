import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function middleware(request: NextRequest) {
  // リクエストから認証トークンCookieを取得
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  let isAuthenticated = false;
  if (token) {
    try {
      // サーバー間通信で、バックエンドの認証チェックAPIを叩く
      // 宛先URLを環境変数から取得
      const response = await fetch(`${BACKEND_API_URL}/api/auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // ステータスコードが200番台なら認証成功とみなす
      if (response.ok) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Middleware auth check failed:", error);
      // バックエンドに接続できないなどのエラーは、認証失敗
      isAuthenticated = false;
    }
  }

  // 認証済みのユーザーがログインページにアクセスした場合
  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/problems", request.url));
  }

  // 未認証のユーザーが保護されたページにアクセスした場合
  // （ログインページ以外はすべて保護対象とみなす）
  if (!isAuthenticated && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 上記以外の場合は、アクセスを許可
  return NextResponse.next();
}

// Middlewareが実行されるパスを定義
export const config = {
  matcher: [
    /*
     * 下記のパスに一致するものを除き、すべてのリクエストパスで実行します。
     * - api (Next.jsのAPIルート)
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico (ファビコンファイル)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
