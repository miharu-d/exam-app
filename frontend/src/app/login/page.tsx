"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Container, Paper, Alert }  from '@mui/material'; 
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const theme = useTheme();

    const { login, isAuthenticated, isLoadingAuth } = useAuth();

    useEffect(() => {
        // 認証情報ロード完了かつ認証済みの場合、リダイレクト
        if (!isLoading && isAuthenticated) {
            router.push('/search');
        }
    }, [isAuthenticated, isLoadingAuth, router, isLoading]);

    // 認証情報ローディング中
    if (isLoadingAuth || isAuthenticated) {
        return (
            <Container maxWidth="xs" sx={{ mt: theme.spacing(8), textAlign: 'center' }}>
                <Typography variant="h6">
                    {isLoadingAuth ? '認証情報を読み込み中...' : '認証済みです。リダイレクト中...'}
                </Typography>
            </Container>
        );
    }

    // 認証済み
    if (isAuthenticated) {
        router.push('/search');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login({ email, password });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'ログイン中に不明なエラーが発生しました。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: theme.spacing(8) }}>
            <Paper elevation={3} sx={{ p: theme.spacing(4), display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5" sx={{ mb: theme.spacing(3) }}>
                    ログイン
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt:1 ,width: '100%'}} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="username"
                        label="メールアドレス"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                    />
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="パスワード"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, mb: 2}} >
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'ログイン中...' : 'ログイン'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}