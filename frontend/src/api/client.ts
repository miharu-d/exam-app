// src/api/client.ts
import axios from 'axios';

// 共通設定を持ったaxiosインスタンスを作成
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンス共通処理（インターセプター）
// 全てのレスポンスは、ここで一度チェックされる
apiClient.interceptors.response.use(
  // 通信成功時の処理
    (response) => {
        //レスポンスデータをそのまま返す
        return response;
    },
    // 通信失敗時の処理
    (error) => {
        // FastAPIからの詳細なエラーメッセージがあればそれを優先
        if (error.response && error.response.data && error.response.data.detail) {
        return Promise.reject(new Error(error.response.data.detail));
        }
        // それ以外はaxiosのデフォルトのエラーメッセージ
        return Promise.reject(new Error(error.message));
    }
);

export default apiClient;