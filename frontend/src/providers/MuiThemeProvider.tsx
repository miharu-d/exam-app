"use client";

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme'; // 作成したテーマをインポート

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline /> {/* CSSリセット */}
        {children}
        </ThemeProvider>
    );
}