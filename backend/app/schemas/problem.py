from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

# 問題作成時にクライアントから受け取るデータ構造
class ProblemCreate(BaseModel):
    subject: str
    year: int
    month: int
    question: str
    answer: str
    hint: Optional[str] = None
    explanation: Optional[str] = None

# 問題更新時にクライアントから受け取るデータ構造 (一部のフィールドのみ)
class ProblemUpdate(BaseModel):
    subject: Optional[str] = None
    year: Optional[int] = None
    month: Optional[int] = None
    question: Optional[str] = None
    answer: Optional[str] = None
    hint: Optional[str] = None
    explanation: Optional[str] = None
    deleted_at: Optional[datetime] = None

# APIレスポンスとして返す問題のデータ構造
# ORMモードを有効にすることで、SQLAlchemyモデルのインスタンスから自動でPydanticモデルに変換される
class ProblemResponse(BaseModel):
    id: int
    subject: str
    year: int
    month: int
    question: str
    answer: str
    hint: Optional[str] = None
    explanation: Optional[str] = None
    user_id: int
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

class RegisterResponse:
    status: bool