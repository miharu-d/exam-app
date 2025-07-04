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
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// 検索条件
export interface SearchCriteria {
  subject?: string;
  year?: string;
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
  answer?: string | null;
  hint?: string | null;
  explanation?: string | null;
  deleted_at?: string | null;
}
