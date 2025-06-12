// src/theme.ts
'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light', // 'dark'にするとダークモードになる
        primary: {
        main: '#1976d2', // メインカラー
        },
        secondary: {
        main: '#dc004e', // アクセントカラー
        },
    },
});

export default theme;