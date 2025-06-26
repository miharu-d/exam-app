"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Box, Container, Typography, CircularProgress, useTheme } from '@mui/material';

interface AuthGuardProps {
    children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { isAuthenticated, isLoadingAuth } = useAuth();
    const router = useRouter();
    const theme = useTheme();

    useEffect(() => {
        // 認証情報のロードが完了し、かつ認証されていない場合
        if (!isLoadingAuth && !isAuthenticated) {
        router.push('/login'); // ログインページへリダイレクト
        }
    }, [isAuthenticated, isLoadingAuth, router]);

    // ロード中、または未認証でリダイレクト中の表示
    if (isLoadingAuth || !isAuthenticated) {
        return (
        <Container maxWidth="lg" sx={{ py: theme.spacing(8), textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="h6">
                {isLoadingAuth ? '認証情報を確認中...' : 'ログインしていません。リダイレクト中...'}
            </Typography>
            </Box>
        </Container>
        );
    }

    // 認証済みであれば、子要素をレンダリング
    return <>{children}</>;
};