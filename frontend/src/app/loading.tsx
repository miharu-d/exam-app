import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: 'calc(100vh - 128px)', // ヘッダー/フッターの高さを引くなど調整
            }}
        >
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>読み込んでいます...</Typography>
        </Box>
    );
}