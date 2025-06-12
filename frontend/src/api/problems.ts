// src/api/problems.ts
import type { Problem, SearchCriteria } from '@/types';
import apiClient from './client'; // 👈 作成した共通クライアントをインポート

export const searchProblems = async (criteria: SearchCriteria): Promise<Problem[]> => {
  // 検索条件をaxiosが扱える形式に変換
    const params = new URLSearchParams();
    if (criteria.subject) {
        params.append('subject', criteria.subject);
    }
    if (criteria.year) {
        params.append('year', criteria.year);
    }

    // GETリクエストを送信。URLの組み立てやエラーハンドリングは共通クライアントがやってくれる
    const response = await apiClient.get('/api/problems', { params });
    
    // axiosはレスポンスの本体をdataプロパティに入れてくれる
    return response.data;
};