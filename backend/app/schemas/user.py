# backend/app/schemas/user.py

from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime
from typing import Optional, List

# Userモデルの型情報を更新
from app.models.problem import Problem # Problemモデルをインポート（リレーションシップ表示用）

# ユーザー作成時のリクエストボディ
class UserCreate(BaseModel):
    username: str
    email: EmailStr # メールアドレス形式のバリデーション
    password: str # 平文パスワード（ハッシュ化して保存する）

# ユーザー情報更新時のリクエストボディ
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None # パスワード更新用
    is_active: Optional[bool] = None
    # hashed_password は直接更新させない

# APIレスポンスとして返すユーザー情報（パスワードなし）
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True) # ORM Mode の代わりに from_attributes を使用