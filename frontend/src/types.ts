// src/types.ts

// バックエンドの schemas/problem.py の ProblemResponse に対応
export interface Problem {
  id: number;
  subject: string;
  year: number;
  month: number;
  question: string;
  answer: string;
  hint: string | null;
  explanation: string | null;
  user_id: number;
  created_at: string; // PythonのdatetimeはJSONでは文字列として送られる
  updated_at: string;
  deleted_at: string | null;
}

// バックエンドの schemas/user.py の UserResponse に対応
export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// 検索条件
export interface SearchCriteria {
  subject: string;
  year: string;
}

// 問題作成時のリクエストボディに対応
export interface ProblemCreate {
  subject: string;
  year: number;
  month: number;
  question: string;
  answer: string;
  hint?: string;
  explanation?: string;
}

// 問題更新時のリクエストボディに対応
export interface ProblemUpdate {
  subject?: string;
  year?: number;
  month?: number;
  question?: string;
  answer?: string;
  hint?: string;
  explanation?: string;
  deleted_at?: string | null;
}

// ログイン
export interface LoginRequest {
  email: string;
  password: string;
}

// token
export interface AuthToken {
  access_token: string;
  token_type: string;
}

// userレスポンス
export interface User {
  id: number;
  username: string;
}
