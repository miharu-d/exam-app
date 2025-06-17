// src/api/client.ts

import axios from "axios";
import type { AxiosError } from "axios";

interface FastAPIValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

// FastAPIのエラーレスポンスの一般的な型を定義
interface FastAPIErrorResponseData {
  detail: string | FastAPIValidationError[] | object;
}

// 共通設定を持ったaxiosインスタンスを作成
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエスト共通処理
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// レスポンス共通処理
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const responseData: unknown = error.response.data;

      if (
        typeof responseData === "object" &&
        responseData !== null &&
        "detail" in responseData
      ) {
        let errorMessage = "";
        const detail = (responseData as FastAPIErrorResponseData).detail;

        if (Array.isArray(detail)) {
          // バリデーションエラーのリストの場合
          // detailの各要素がFastAPIValidationErrorの構造を持つことを前提
          errorMessage = detail
            .map(
              (err: FastAPIValidationError) =>
                `${err.loc.join(".")}: ${err.msg}`
            )
            .join("; ");
        } else if (typeof detail === "object" && detail !== null) {
          // 単なるオブジェクトの場合
          errorMessage = JSON.stringify(detail);
        } else if (typeof detail === "string") {
          // 文字列の場合
          errorMessage = detail;
        } else {
          // 予期しない形式の場合
          errorMessage = "不明なAPIエラーレスポンス形式";
        }

        return Promise.reject(new Error(errorMessage));
      } else {
        // error.response.data.detail が存在しないが、error.response はある場合
        // responseData がオブジェクトだが detail プロパティを持たない場合
        return Promise.reject(
          new Error(
            `APIエラー: ${error.response.status} ${
              error.response.statusText || ""
            }`
          )
        );
      }
    } else if (error.request) {
      return Promise.reject(
        new Error("ネットワークエラー: サーバーからの応答がありません。")
      );
    } else {
      return Promise.reject(new Error(`エラー: ${error.message}`));
    }
  }
);

export default apiClient;
