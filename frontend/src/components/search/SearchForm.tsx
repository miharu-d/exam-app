// src/components/search/SearchForm.tsx
"use client";
import type { SearchCriteria } from '@/types';
import { useState } from 'react';
import { Box, TextField, Button, Grid, Paper, Select, MenuItem, InputLabel, FormControl, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { SelectChangeEvent } from '@mui/material/Select'; 
import type { ReactNode } from 'react';

interface Props {
    onSearch: (criteria: SearchCriteria) => void;
    isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: Props) => {
    const [criteria, setCriteria] = useState<SearchCriteria>({ subject: '', year: '' });
    const theme = useTheme();

    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, _child?: ReactNode ) => {
        const name = e.target.name || '';
        const value = name === 'year' ? Number(e.target.value) : e.target.value;

        setCriteria({ ...criteria, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(criteria);
    };

    return (
        <Paper elevation={2} sx={{ p: { xs: theme.spacing(2), sm: theme.spacing(4) }, mb: theme.spacing(4) }}>
            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={5}>
                        <Box component="div">
                            <TextField
                            fullWidth
                            label="科目"
                            name="subject"
                            value={criteria.subject}
                            onChange={handleChange}
                            variant="outlined"
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Box component="div">
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
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box component="div">
                        <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        startIcon={<SearchIcon />}
                        sx={{ height: '56px', borderRadius: theme.shape.borderRadius * 2 }}
                        >
                        {isLoading ? '検索中...' : '検索'}
                        </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};