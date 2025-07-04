"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFlashMessage } from '@/context/FlashMessageContext';
import { ProblemForm } from './ProblemForm';
import type { Problem } from '@/types/problem';

type ProblemFormData = Omit<Problem, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;

interface HandlerProps {
    problemId: number;
    defaultValues: ProblemFormData;
    updateAction: (data: ProblemFormData) => Promise<{ success: boolean; message?: string }>;
}

export const ProblemEditFormHandler = ({ problemId, defaultValues, updateAction }: HandlerProps) => {
    const router = useRouter();
    const { showFlashMessage } = useFlashMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (data: ProblemFormData) => {
        setIsLoading(true);
        setFormError(null);

        const result = await updateAction(data);

        setIsLoading(false);

        if (result.success && result.message) {
        // 成功したら、Contextにメッセージをセットしてから画面遷移
        showFlashMessage(result.message, 'success');
        router.push(`/problems/${problemId}`);
        } else {
        // 失敗したら、フォーム内にエラーメッセージを表示
        setFormError(result.message || "更新に失敗しました。");
        }
    };

    return (
        <ProblemForm
        formTitle="問題の編集"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        formError={formError}
        />
    );
};
