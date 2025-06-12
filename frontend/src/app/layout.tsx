// src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme'; // 後で作成するテーマファイル

// Google FontsからRobotoを読み込む
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "試験問題システム",
  description: "試験問題管理・分析サービス",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={roboto.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaselineでブラウザのデフォルトスタイルをリセット */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}