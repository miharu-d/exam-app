import { Container } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import MuiThemeProvider from '@/providers/MuiThemeProvider';
import { AuthProvider } from "@/context/AuthContext";
import { FlashMessageProvider } from '@/context/FlashMessageContext';
import { Header } from "@/components/layout/Header";
import { FlashMessage } from '@/components/ui/FlashMessage';
import { getServerUser } from '@/lib/auth/session';
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

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
                        <FlashMessageProvider>
                            <AuthProvider initialUser={initialUser}>
                                <Header />
                                <main>
                                    <Container maxWidth="lg" sx={{ mt: 2 }}>
                                        <FlashMessage />
                                    </Container>
                                    {children}
                                </main>
                            </AuthProvider>
                        </FlashMessageProvider>
                    </MuiThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
