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

// userレスポンス
export interface User {
  id: number;
  username: string;
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
