"use client";
import type { SearchCriteria } from '@/types/problem';
import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
    Box, 
    TextField, 
    Button, 
    Grid, 
    Paper, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl, 
    useTheme 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { ReactNode } from 'react';

export const SearchForm = () => {
    const router = useRouter();
    const currentParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const theme = useTheme();

    const [criteria, setCriteria] = useState<SearchCriteria>({
        subject: currentParams.get('subject') || '',
        year: currentParams.get('year') || '',
    });

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, _child?: ReactNode ) => {
        const name = e.target.name || '';
        const value = e.target.value;
        setCriteria({ ...criteria, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const params = new URLSearchParams();
        if (criteria.subject) {
            params.set('subject', criteria.subject);
        }
        if (criteria.year) {
            params.set('year', String(criteria.year));
        }

        startTransition(() => {
            router.push(`/problems?${params.toString()}`);
        });
    };

    return (
        <Paper elevation={2} sx={{ p: { xs: theme.spacing(2), sm: theme.spacing(4) }, mb: theme.spacing(4) }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            label="科目"
                            name="subject"
                            value={criteria.subject}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="year-select-label">年度</InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                name="year"
                                value={criteria.year}
                                onChange={handleChange}
                                label="年度"
                            >
                                <MenuItem value=""><em>選択なし</em></MenuItem>
                                {years.map(year => (
                                    <MenuItem key={year} value={year}>{year}年</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isPending}
                            startIcon={<SearchIcon />}
                            sx={{ height: '56px' }}
                        >
                            {isPending ? '検索中...' : '検索'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};
