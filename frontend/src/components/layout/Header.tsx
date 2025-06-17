// frontend/src/components/layout/Header.tsx
"use client";

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // 認証コンテキスト

export const Header = () => {
    const theme = useTheme();
    // 画面幅がmd (900px) より小さい場合にtrue
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

    // 認証状態とログアウト関数
    const { isAuthenticated, user, logout } = useAuth();

    // モバイルメニュー用
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout(); // ログアウト関数を呼び出し
        handleClose(); // メニューを閉じる
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    試験問題システム
                </Link>
                </Typography>

                {isMobile ? (
                <Box>
                    <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                    <MenuItem onClick={handleClose} component={Link} href="/">
                        トップ
                    </MenuItem>
                    {isAuthenticated && user ? (
                        // ログイン済みの場合
                        [
                        <MenuItem key="search" onClick={handleClose} component={Link} href="/search">
                            問題検索
                        </MenuItem>,
                        <MenuItem key="mypage" onClick={handleClose} component={Link} href="/mypage">
                            マイページ
                        </MenuItem>,
                        <MenuItem key="username" onClick={handleClose}>
                            {user.username}
                        </MenuItem>,
                        <MenuItem key="logout" onClick={handleLogout}>
                            ログアウト
                        </MenuItem>
                        ]
                    ) : (
                        // 未ログインの場合
                        <MenuItem onClick={handleClose} component={Link} href="/login">
                            ログイン
                        </MenuItem>
                    )}
                    </Menu>
                </Box>
                ) : ( // デスクトップ表示の場合
                <Box sx={{ display: 'flex' }}>
                    <Button color="inherit" component={Link} href="/">
                        トップ
                    </Button>
                    {isAuthenticated && user ? (
                    // ログイン済みの場合
                    <>
                        <Button color="inherit" component={Link} href="/search">
                            問題検索
                        </Button>
                        <Button color="inherit" component={Link} href="/mypage">
                            マイページ
                        </Button>
                        <Typography variant="button" color="inherit" sx={{ mx: 2, display: 'flex', alignItems: 'center' }}>
                            {user.username}
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            ログアウト
                        </Button>
                    </>
                    ) : (
                    // 未ログインの場合
                    <Button color="inherit" component={Link} href="/login">
                        ログイン
                    </Button>
                    )}
                </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};