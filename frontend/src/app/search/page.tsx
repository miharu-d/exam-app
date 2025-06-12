// src/app/search/page.tsx (最終版)
"use client";
import { useState } from 'react';
import type { Problem, SearchCriteria } from '@/types';
import { searchProblems } from '@/api/problems'; // 👈 API関数をインポート
import { SearchForm } from '@/components/search/SearchForm';
import { ProblemList } from '@/components/search/ProblemList';
import { Container, Typography, Box } from '@mui/material';

export default function SearchPage() {
  // 初期状態は空の配列にする
    const [problems, setProblems] = useState<Problem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // handleSearch関数を、APIを呼び出す非同期関数に書き換える
    const handleSearch = async (criteria: SearchCriteria) => {
        setIsLoading(true); // 検索開始！ローディング表示をON
        setError(null);     // 古いエラーメッセージをリセット

        try {
        // 実際にAPIを呼び出して結果を取得
        const results = await searchProblems(criteria);
        setProblems(results); // 取得した結果をstateに保存
        } catch (err) {
        // エラーが発生したらメッセージをセット
        setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
        setProblems([]); // エラー時は結果をクリア
        } finally {
        // 成功しても失敗しても、ローディングは終了
        setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
            問題検索
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            過去の問題を検索して、試験対策に役立てよう。
            </Typography>
        </Box>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        <ProblemList problems={problems} isLoading={isLoading} error={error} />
        </Container>
    );
}