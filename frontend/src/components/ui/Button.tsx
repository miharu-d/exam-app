// src/components/ui/Button.tsx
"use client"; // クリックイベントを扱うのでクライアントコンポーネント

import type { ComponentProps } from 'react';

// ボタンが受け取るpropsの型を定義
interface ButtonProps extends ComponentProps<'button'> {
    variant?: 'primary' | 'secondary' | 'accent'; // ボタンの色の種類
    isLoading?: boolean;
}

export const Button = ({
        children,
        variant = 'primary', // デフォルトはprimary
        className,
        isLoading,
        ...props
    }: ButtonProps) => {
    // daisyUIのクラスと、外から渡されるクラスを組み合わせる
    const buttonClasses = `btn btn-${variant} ${className || ''}`;

    return (
        <button className={buttonClasses} {...props} disabled={isLoading || props.disabled}>
        {isLoading && <span className="loading loading-spinner"></span>}
        {children}
        </button>
    );
};