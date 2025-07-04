"use client";
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { Box, TextField, Button, Typography, Container, Paper, Alert }  from '@mui/material'; 
import { useAuth } from '@/context/AuthContext';
import type { LoginRequest } from '@/types/user'; 

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme();
    const { login, isLoadingAuth } = useAuth();

    // 初期化
    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

    // フォーム送信時の処理
    const onSubmit: SubmitHandler<LoginRequest> = async (data) => {
        setError(null);
        try {
            await login(data);
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

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt:1 ,width: '100%'}} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="メールアドレス"
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                        {...register("email", { required: "メールアドレスは必須です。"})}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField 
                        margin="normal"
                        required
                        fullWidth
                        label="パスワード"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant="outlined"
                        {...register("password", { required: "パスワードは必須です" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
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