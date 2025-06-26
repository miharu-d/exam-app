"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, LoginRequest } from '@/types/user';
import { loginUser, logoutUser } from '@/api/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    isLoadingAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, initialUser }: { children: React.ReactNode, initialUser: User | null }) {
    const [user, setUser] = useState<User | null>(initialUser);
    const [isLoadingAuth, setIsLoadingAuth] = useState(false);
    const router = useRouter();

    const login = useCallback(async (credentials: LoginRequest) => {
        setIsLoadingAuth(true);
        try {
            // loginUserを呼び出し、ユーザー情報を直接受け取る
            const loggedInUser = await loginUser(credentials);
            
            // 受け取ったユーザー情報でContextの状態を更新
            setUser(loggedInUser);

            // 遷移
            router.push('/problems');
        } catch (error) {
            console.error("Login failed:", error);
            setUser(null);
            throw error;
        } finally {
            setIsLoadingAuth(false);
        }
    }, [router]);


    const logout = useCallback(async () => {
        setIsLoadingAuth(true);
        try {
            await logoutUser(); // バックエンドでCookieを削除
            setUser(null); // Contextの状態をクリア
            router.push('/login');
            // router.refresh()を呼ぶと、サーバーコンポーネントの状態も確実に更新される
            router.refresh(); 
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoadingAuth(false);
        }
    }, [router]);

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isLoadingAuth }}>
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