from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime
from typing import Optional, List
from app.models.problem import Problem

# ユーザー作成時のリクエストボディ
class UserCreate(BaseModel):
    username: str
    email: EmailStr # メールアドレス形式のバリデーション
    password: str

# ユーザー情報更新時のリクエストボディ
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None

# APIレスポンスとして返すユーザー情報（パスワードなし）
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)