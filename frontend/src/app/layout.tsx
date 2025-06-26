import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MuiThemeProvider from '@/providers/MuiThemeProvider';
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { getServerUser } from "@/lib/auth/session";

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialUser = await getServerUser();

    return (
        <html lang="ja">
            <body className={roboto.className}>
                <AppRouterCacheProvider>
                    <MuiThemeProvider>
                        <AuthProvider initialUser={initialUser}>
                            <Header />
                            <main>
                                {children}
                            </main>
                        </AuthProvider>
                    </MuiThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}