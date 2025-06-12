// src/components/search/ProblemList.tsx (改訂版)
import type { Problem } from '@/types';
import { ProblemCard } from './ProblemCard';
// Gridの代わりにStackなどをインポートします
import { Box, CircularProgress, Alert, Typography, Stack } from '@mui/material';

interface Props {
    problems: Problem[];
    isLoading: boolean;
    error: string | null;
}

export const ProblemList = ({ problems, isLoading, error }: Props) => {
    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 2 }}>エラー: {error}</Alert>;
    }

    if (problems.length === 0) {
        return <Typography sx={{ textAlign: 'center', my: 4 }}>条件に合う問題が見つかりませんでした。</Typography>;
    }

    // 以前のGridコンポーネントを、Stackコンポーネントに置き換えます
    // spacing={3}で、各カードの間に程よい余白ができます
    return (
        <Stack spacing={3}>
        {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
        ))}
        </Stack>
    );
};