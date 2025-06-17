"use client";
// frontend/app/page.tsx
import { Typography, Container, Button } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // 認証コンテキストをインポート

export default function HomePage() {
    const { isAuthenticated, user } = useAuth();

    return (
        <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                試験問題システムへようこそ！
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                過去の試験問題を検索して、学習に役立てましょう。
            </Typography>
            {isAuthenticated && user ? (
                <Button variant="contained" color="primary" component={Link} href="/search">
                    問題検索へ
                </Button>
            ) : (
                <Button variant="outlined" color="secondary" component={Link} href="/login">
                    ログイン
                </Button>
            )}
            
        </Container>
    );
}