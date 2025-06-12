// src/components/search/ProblemCard.tsx
import type { Problem } from '@/types';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface Props {
    problem: Problem;
}

export const ProblemCard = ({ problem }: Props) => {
    return (
        <Card variant="outlined">
        <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
            {problem.subject} ({problem.year}年)
            </Typography>
            <Typography variant="body1">
            {problem.question}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" variant="contained">解答を見る</Button>
        </CardActions>
        </Card>
    );
};