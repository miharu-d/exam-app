import type { Problem } from '@/types/problem';
import { ProblemCard } from './ProblemCard';
import { Typography, Stack } from '@mui/material';

interface Props {
    problems: Problem[];
}

export const ProblemList = ({ problems }: Props) => {
    if (!problems || problems.length === 0) {
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