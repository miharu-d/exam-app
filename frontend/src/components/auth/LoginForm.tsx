"use client";
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Container, Paper, Alert }  from '@mui/material'; 
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();

    const { login, isLoadingAuth } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            await login({ email, password });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ログイン情報が正しくありません。');
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
                        disabled={isLoadingAuth}
                    >
                        {isLoadingAuth ? 'ログイン中...' : 'ログイン'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}