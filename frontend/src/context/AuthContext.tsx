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

    // ログアウト処理
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        router.push('/login');
    }, [router]);

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
    }, [logout]);

    // トークンをLocalStorageからロード
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
        setToken(storedToken);
        fetchUser(storedToken);
        } else {
        setIsLoadingAuth(false);
        }
    }, [fetchUser]);

    // ログイン処理
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
    }, [router, logout, fetchUser]);

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