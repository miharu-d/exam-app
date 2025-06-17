// src/components/search/ProblemCard.tsx
import type { Problem } from '@/types';
import { Card, CardContent, Typography, CardActions, Button, useTheme } from '@mui/material';

interface Props {
    problem: Problem;
}

export const ProblemCard = ({ problem }: Props) => {
    const theme = useTheme();

    return (
        <Card variant="outlined" sx={{ 
            borderRadius: theme.shape.borderRadius * 2,
            boxShadow: theme.shadows[3],
            '&:hover': { 
                transform: 'translateY(-3px)', 
                boxShadow: theme.shadows[6],
            }, 
            transition: 'all 0.2s ease-in-out',
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper,
        }}>
        <CardContent>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {problem.year}年 {problem.month}月
            </Typography>
            <Typography variant="h6" component="div" gutterBottom color="primary.dark">
                {problem.subject}
            </Typography>
            <Typography variant="body1" sx={{ mt: theme.spacing(2) }}>
                {problem.question}
            </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', px: theme.spacing(2), pb: theme.spacing(2) }}>
            <Button size="small" variant="contained" color="secondary">
                解答を見る
            </Button>
        </CardActions>
        </Card>
    );
};