"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import type { AlertColor } from '@mui/material';

interface FlashMessageState {
    message: string;
    severity: AlertColor;
}

interface FlashMessageContextType {
    flash: FlashMessageState | null;
    showFlashMessage: (message: string, severity?: AlertColor) => void;
    clearFlashMessage: () => void;
}

const FlashMessageContext = createContext<FlashMessageContextType | undefined>(undefined);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
    const [flash, setFlash] = useState<FlashMessageState | null>(null);

    // 新しいメッセージをセットする
    const showFlashMessage = useCallback((message: string, severity: AlertColor = 'success') => {
        setFlash({ message, severity });
    }, []);

    // メッセージの状態をクリアする
    const clearFlashMessage = useCallback(() => {
        setFlash(null);
    }, []);

    // Contextに渡す値を定義
    const value = { flash, showFlashMessage, clearFlashMessage };

    return (
        <FlashMessageContext.Provider value={value}>
            {children}
        </FlashMessageContext.Provider>
    );
};

// 他のコンポーネントから簡単にContextを呼び出すためのカスタムフック
export const useFlashMessage = () => {
    const context = useContext(FlashMessageContext);
    if (!context) {
        throw new Error('useFlashMessage must be used within a FlashMessageProvider');
    }
    return context;
};
