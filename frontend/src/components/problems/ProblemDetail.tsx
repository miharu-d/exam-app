import type { Problem } from '@/types/problem';
import { Box, Typography, Paper, Divider } from '@mui/material';

export const ProblemHeader = ({ problem }: { problem: Problem }) => (
    <>
        <Typography variant="h4" component="h1" gutterBottom color="primary.dark" align="center">
        {problem.subject}（{problem.year}年{problem.month}月）
        </Typography>
        <Divider sx={{ my: 3 }} />
    </>
);

export const ProblemBody = ({ problem }: { problem: Problem }) => (
    <Paper elevation={3} sx={{ p: 4, mb: 3, borderRadius: 2 }}>
        <Typography variant="h5" component="h2" sx={{ mt: 3, mb: 1, fontWeight: 'bold' }}>
            問題:
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
            {problem.question}
        </Typography>

        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>
            解答:
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
            {problem.answer}
        </Typography>

        {problem.hint && (
            <>
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>
                    ヒント:
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {problem.hint}
                </Typography>
            </>
        )}
        {problem.explanation && (
            <>
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>
                    解説:
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {problem.explanation}
                </Typography>
            </>
        )}
    </Paper>
);
