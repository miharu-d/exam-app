import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; 
import type { SearchCriteria } from '@/types/problem';
import { searchProblems } from '@/api/problems';
import { SearchForm } from '@/components/problems/SearchForm';
import { ProblemList } from '@/components/problems/ProblemList';
import { Container, Typography, Box } from '@mui/material';

export default async function ProblemsPage({ searchParams }: { searchParams: SearchCriteria }) {
    const token = cookies().get('authToken')?.value;
    if (!token) {
        redirect('/login');
    }
    const { data: problems } = await searchProblems(searchParams, token);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4, pt: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom color="primary.dark">
                    問題検索
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    過去の問題を検索して、試験対策に役立てよう。
                </Typography>
            </Box>

            <SearchForm />

            <ProblemList problems={problems || []} />
        </Container>
    );
}
