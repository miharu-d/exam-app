// src/api/problems.ts
import type { Problem, SearchCriteria } from '@/types';

// バックエンドサーバーのURL
const API_BASE_URL = 'http://localhost:8000';

export const searchProblems = async (criteria: SearchCriteria): Promise<Problem[]> => {
  // 検索条件から `?subject=統計学&year=2023` のようなURLの末尾部分（クエリ文字列）を生成
    const queryParams = new URLSearchParams();

    if (criteria.subject) {
        queryParams.append('subject', criteria.subject);
    }
    if (criteria.year) {
        queryParams.append('year', criteria.year);
    }

    // バックエンドの検索APIを呼び出す
    // バックエンドの構成変更でURLが /problems/search になったのを反映
    const response = await fetch(`${API_BASE_URL}/problems/search?${queryParams.toString()}`);

    // 通信が失敗した場合の処理
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // エラーの本文がJSONでない場合も考慮
        throw new Error(errorData.detail || 'サーバーとの通信に失敗しました');
    }

    // 成功した場合、受け取ったJSONデータを返す
    return response.json();
};