// src/components/ui/Input.tsx
"use client";

import type { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export const Input = ({ className, ...props }: InputProps) => {
    const inputClasses = `input input-bordered w-full ${className || ''}`;
    return <input className={inputClasses} {...props} />;
};