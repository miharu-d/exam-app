// src/components/search/ProblemList.tsx
import type { Problem } from '@/types';
import { ProblemCard } from './ProblemCard';
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
    
    return (
        <Stack spacing={3}>
        {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
        ))}
        </Stack>
    );
};