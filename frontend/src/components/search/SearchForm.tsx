// src/components/search/SearchForm.tsx
"use client";
import type { SearchCriteria } from '@/types';
import { useState } from 'react';
import { Box, TextField, Button, Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    onSearch: (criteria: SearchCriteria) => void;
    isLoading: boolean;
}

export const SearchForm = ({ onSearch, isLoading }: Props) => {
    const [criteria, setCriteria] = useState<SearchCriteria>({ subject: '', year: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCriteria({ ...criteria, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(criteria);
    };

    return (
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
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
                <TextField
                fullWidth
                label="年度"
                name="year"
                value={criteria.year}
                onChange={handleChange}
                variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={<SearchIcon />}
                >
                {isLoading ? '検索中...' : '検索'}
                </Button>
            </Grid>
            </Grid>
        </Box>
        </Paper>
    );
};