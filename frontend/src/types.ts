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

// バックエンドの schemas/user.py の UserResponse に対応 (まだなければ後で追加)
export interface User {
    id: number;
    username: string;
    email: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    // hashed_password はセキュリティ上、responseには含めないことが多い
}

// 検索条件
export interface SearchCriteria {
    subject: string;
    year: string; // TextFieldのvalueは文字列なのでstring
    month?: string; // monthも検索条件として追加するなら
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