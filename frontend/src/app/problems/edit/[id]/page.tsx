import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { fetchProblemById, updateProblem } from '@/api/problems';
import type { ProblemUpdate } from '@/types/problem';
import { type ProblemFormData } from '@/components/problems/ProblemForm';
import { Container } from '@mui/material';
import { ProblemEditFormHandler } from '@/components/problems/ProblemEditHandler';

type EditProblemPageProps = {
    params: { id: string };
};

export default async function EditProblemPage({ params }: EditProblemPageProps) {
    const token = cookies().get('authToken')?.value;
    if (!token) {
        redirect('/login');
    }

    const problemId = parseInt(params.id, 10);
    if (isNaN(problemId)) {
        notFound();
    }

    // 初期データを取得
    const { data: problemData } = await fetchProblemById(problemId, token);
    if (!problemData) {
        notFound();
    }

    // サーバーアクションを定義
    async function handleUpdate(formData: ProblemFormData) {
        "use server";
        
        const actionToken = cookies().get("authToken")?.value;
        if (!actionToken) {
            return { success: false, message: "認証トークンがありません。" };
        }

        const updatePayload: ProblemUpdate = {
            subject: formData.subject,
            year: formData.year,
            month: formData.month,
            question: formData.question,
            answer: formData.answer,
            hint: formData.hint,
            explanation: formData.explanation,
        };

        try {
            await updateProblem(problemId, updatePayload, actionToken);
        } catch (error) {
            console.log(error)
            return { success: false, message: "更新に失敗しました。" };
        }

        revalidatePath(`/problems`);
        revalidatePath(`/problems/${problemId}`);
        
        return { success: true, message: "問題を変更しました。" };
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
        <ProblemEditFormHandler
            problemId={problemId}
            defaultValues={problemData}
            updateAction={handleUpdate}
        />
        </Container>
    );
}
