// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. リクエストから認証トークンCookieを取得します
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // 認証済みユーザーの処理
  if (token) {
    // もしログイン済みのユーザーがログインページにアクセスしようとしたら、問題一覧ページにリダイレクト
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/problems", request.url));
    }
    // それ以外の場所へのアクセスは許可
    return NextResponse.next();
  }

  // 未認証ユーザーの処理
  if (!token) {
    // もし未認証のユーザーがログインページ以外にアクセスしようとしたら、ログインページにリダイレクト
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // ログインページへのアクセスは許可
    return NextResponse.next();
  }
}

// Middlewareが実行されるパスを定義
// api, _next/static, _next/image, favicon.ico を除く全てのパスで実行される。
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
