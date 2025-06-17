// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginRequest } from '@/types';
import { loginUser, fetchCurrentUser } from '@/api/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const router = useRouter();

    // ログアウト処理 (useCallback の依存性には router のみでOK)
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        router.push('/login');
    }, [router]); // ★fetchUser を削除★

  // fetchUser は useCallback でラップされているので、ここでは依存性配列に含める
  // 循環参照に見えるが、useCallback が依存性を正しく管理するため問題ない
  // ただし、もし fetchUser の定義が AuthProvider の外にあるなら話は別だが、ここでは内側にある
  // そのため、useEffect の依存性配列に fetchUser を含めるのは正解
  // ESLint が言う 'missing dependency' は 'fetchUser' が外で定義されているように見えるため
  // ここでは fetchUser を依存性に追加し、ESLintの警告を解消する

  // ユーザー情報をフェッチする関数 (useCallback の依存性に logout を追加)
    const fetchUser = useCallback(async (authToken: string) => {
        try {
        const currentUser = await fetchCurrentUser(authToken);
        setUser(currentUser);
        setIsLoadingAuth(false);
        } catch (error) {
        console.error("Failed to fetch user data:", error);
        logout();
        setIsLoadingAuth(false);
        }
    }, [logout]); // ★logout を依存性配列に追加★

    // トークンをLocalStorageからロード (useEffect の依存性に fetchUser を追加)
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
        setToken(storedToken);
        fetchUser(storedToken);
        } else {
        setIsLoadingAuth(false);
        }
    }, [fetchUser]); // ★fetchUser を依存性配列に追加★

    // ログイン処理 (useCallback の依存性から fetchUser を削除)
    const login = useCallback(async (credentials: LoginRequest) => {
        setIsLoadingAuth(true);
        try {
        const authToken = await loginUser(credentials);
        localStorage.setItem('authToken', authToken.access_token);
        setToken(authToken.access_token);
        await fetchUser(authToken.access_token);
        router.push('/search');
        } catch (error) {
        console.error("Login failed:", error);
        logout();
        throw error;
        } finally {
        setIsLoadingAuth(false);
        }
    }, [router, logout, fetchUser]); // ★fetchUser は必要、ただし loginUser 自体はfetchUserに依存しない

    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout, isLoadingAuth }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};