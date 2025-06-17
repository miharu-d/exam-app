// frontend/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 認証が必要なパスのパターン
// ここでは / (トップページ) と /login 以外の全てのパスを保護
// ただし、/api はバックエンドのAPIなので保護対象外
// /_next/static や /_next/image などNext.jsの内部パスも保護対象外
const protectedPaths = ["/search", "/mypage"];

// 認証から除外するパス（ログインしていなくてもアクセスできるパス）
const publicPaths = ["/", "/login", "/api/.*", "/_next/.*"];

export function middleware(request: NextRequest) {
  // トークンをCookieから取得 (後でCookieを使うなら)
  // 現状はLocalStorageに保存しているので、ここではトークンの存在をサーバーサイドで直接確認できない
  const token = request.cookies.get("authToken")?.value;

  // LocalStorageのトークンをサーバーサイドミドルウェアで直接読むことはできないため、
  // このミドルウェアは主に「HttpOnly Cookieにトークンを保存する」場合に有効。
  // 現状のLocalStorage運用では、Client Component側でのリダイレクトを補完的に使用する。

  const { pathname } = request.nextUrl;

  // 保護対象外のパスであれば、そのまま通過
  // 正規表現を使ってチェック
  for (const publicPath of publicPaths) {
    if (new RegExp(`^${publicPath}$`).test(pathname)) {
      return NextResponse.next();
    }
  }

  // 保護対象のパスであれば認証状態をチェック
  // トークンがない場合、ログインページへリダイレクト
  if (!token) {
    // トークンがCookieになければ未認証とみなす
    // `login` ページへのリダイレクトが無限ループしないようにする
    if (pathname !== "/login") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // それ以外（トークンがあるか、ログインページへのアクセス）はそのまま通過
  return NextResponse.next();
}

// ミドルウェアが実行されるパスを定義
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // api, _next などの内部パスは除外
};
