"use client";

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import type { Problem } from '@/types/problem';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    CircularProgress,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from '@mui/material';

export type ProblemFormData = Omit<Problem, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;

interface ProblemFormProps {
    onSubmit: SubmitHandler<ProblemFormData>;
    defaultValues?: ProblemFormData;
    isLoading?: boolean;
    formError?: string | null;
    formTitle: string;
}

export const ProblemForm = ({ onSubmit, defaultValues, isLoading, formError, formTitle }: ProblemFormProps) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ProblemFormData>({
        defaultValues: defaultValues || {},
    });

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                {formTitle}
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                {formError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {formError}
                    </Alert>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            label="科目名"
                            variant="outlined"
                            {...register("subject", { required: "科目名は必須です" })}
                            error={!!errors.subject}
                            helperText={errors.subject?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Controller
                            name="year"
                            control={control}
                            rules={{ required: "年度は必須です" }}
                            render={({ field }) => (
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="month-year-label">年</InputLabel>
                                    <Select
                                        labelId="year-select-label"
                                        label="年"
                                        {...field}
                                        value={field.value || ""}
                                    >
                                        {Array.from(years).map(year => (
                                        <MenuItem key={year} value={year}>{year}年</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Controller
                            name="month"
                            control={control}
                            rules={{ required: "月は必須です" }}
                            render={({ field }) => (
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="month-select-label">月</InputLabel>
                                    <Select
                                        labelId="month-select-label"
                                        label="月"
                                        {...field}
                                        value={field.value || ""}
                                    >
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                                        <MenuItem key={month} value={month}>{month}月</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="問題文"
                            variant="outlined"
                            multiline
                            rows={5}
                            {...register("question", { required: "問題文は必須です" })}
                            error={!!errors.question}
                            helperText={errors.question?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="解答"
                            variant="outlined"
                            multiline
                            rows={5}
                            {...register("answer", { required: "解答は必須です" })}
                            error={!!errors.answer}
                            helperText={errors.answer?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="ヒント（任意）"
                            variant="outlined"
                            multiline
                            rows={3}
                            {...register("hint")}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="解説（任意）"
                            variant="outlined"
                            multiline
                            rows={4}
                            {...register("explanation")}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {isLoading ? '保存中...' : '保存する'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};
