// src/components/search/ProblemCard.tsx (再掲)
import type { Problem } from '@/types';
import { Card, CardContent, Typography, CardActions, Button, useTheme } from '@mui/material'; // useTheme もインポート

interface Props {
    problem: Problem;
}

export const ProblemCard = ({ problem }: Props) => {
    const theme = useTheme(); // テーマオブジェクトにアクセス

    return (
        <Card variant="outlined" sx={{ 
            borderRadius: theme.shape.borderRadius * 2, // テーマからborderRadiusを取得
            boxShadow: theme.shadows[3], // テーマから影の強度を取得 (例: shadows[3])
            '&:hover': { 
                transform: 'translateY(-3px)', 
                boxShadow: theme.shadows[6], // ホバー時はより強い影
            }, 
            transition: 'all 0.2s ease-in-out',
            borderColor: theme.palette.divider, // わずかな境界線
            backgroundColor: theme.palette.background.paper,
        }}>
        <CardContent>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {problem.year}年 {problem.month}月
            </Typography>
            <Typography variant="h6" component="div" gutterBottom color="primary.dark">
                {problem.subject}
            </Typography>
            <Typography variant="body1" sx={{ mt: theme.spacing(2) }}> {/* theme.spacing を使う */}
                {problem.question}
            </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', px: theme.spacing(2), pb: theme.spacing(2) }}> {/* theme.spacing を使う */}
            <Button size="small" variant="contained" color="secondary">
                解答を見る
            </Button>
        </CardActions>
        </Card>
    );
};