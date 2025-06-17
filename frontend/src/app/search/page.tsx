"use client";
import { useState } from 'react';
import type { Problem, SearchCriteria } from '@/types';
import { searchProblems } from '@/api/problems';
import { SearchForm } from '@/components/search/SearchForm';
import { ProblemList } from '@/components/search/ProblemList';
import { Container, Typography, Box, useTheme } from '@mui/material'; // useTheme をインポート
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function SearchPage() {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const theme = useTheme(); // テーマオブジェクトにアクセス

    const handleSearch = async (criteria: SearchCriteria) => {
        setIsLoading(true);
        setError(null);

        try {
            const results = await searchProblems(criteria);
            setProblems(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
            setProblems([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthGuard>
            <Container maxWidth="lg" sx={{ py: theme.spacing(4), backgroundColor: theme.palette.background.default }}>
                <Box sx={{ textAlign: 'center', mb: theme.spacing(4), pt: theme.spacing(2) }}>
                    <Typography variant="h3" component="h1" gutterBottom color="primary.dark">
                    問題検索
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                    過去の問題を検索して、試験対策に役立てよう。
                    </Typography>
                </Box>

                <SearchForm onSearch={handleSearch} isLoading={isLoading} />

                <ProblemList problems={problems} isLoading={isLoading} error={error} />
            </Container>
        </AuthGuard>
    );
}