"use client";

import { useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { SearchCriteria } from '@/types/problem';
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

export const SearchForm = () => {
    const router = useRouter();
    const currentParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const theme = useTheme();

    // 初期化
    const { handleSubmit, register, control } = useForm<SearchCriteria>({
        defaultValues: {
            subject: currentParams.get('subject') || '',
            year: currentParams.get('year') || '',
        }
    });

    // フォームが送信されたときの処理
    const handleSearch: SubmitHandler<SearchCriteria> = (data) => {
        const params = new URLSearchParams();
        if (data.subject) {
            params.set('subject', data.subject);
        }
        if (data.year) {
            params.set('year', String(data.year));
        }

        startTransition(() => {
            router.push(`/problems?${params.toString()}`);
        });
    };

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

    return (
        <Paper elevation={2} sx={{ p: { xs: theme.spacing(2), sm: theme.spacing(4) }, mb: theme.spacing(4) }}>
            <Box component="form" onSubmit={handleSubmit(handleSearch)}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <TextField
                            fullWidth
                            label="科目"
                            variant="outlined"
                            {...register("subject")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Controller
                            name="year"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="year-select-label">年度</InputLabel>
                                    <Select
                                        labelId="year-select-label"
                                        label="年度"
                                        {...field}
                                    >
                                        <MenuItem value=""><em>選択なし</em></MenuItem>
                                        {years.map(year => (
                                            <MenuItem key={year} value={year}>{year}年</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
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
