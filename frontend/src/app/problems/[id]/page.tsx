import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { fetchProblemById } from '@/api/problems';
import {
    Box,
    Button,
} from '@mui/material';
import { ProblemHeader, ProblemBody } from '@/components/problems/ProblemDetail';

type Props = {
    params: { id: string };
};

export default async function ProblemDetailPage({ params }: Props) {
    const token = cookies().get('authToken')?.value;
    const problemId = parseInt(params.id, 10);

    if (isNaN(problemId)) {
        notFound();
    }

    const problem = await fetchProblemById(problemId, token);

    if (!problem) {
        notFound();
    }

    return (
        <Box sx={{ p: 4, maxWidth: '800px', mx: 'auto', mt: 4 }}>
            <ProblemHeader problem={problem} />
            <ProblemBody problem={problem} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Link href="/problems" passHref>
                    <Button variant="contained" color="primary" size="large">
                        問題一覧に戻る
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
