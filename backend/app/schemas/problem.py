from pydantic import BaseModel, ConfigDict, Field
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
    subject: Optional[str] = Field(None, min_length=1, max_length=50, description="科目名")
    year: Optional[int] = Field(None, ge=1900, le=datetime.now().year, description="年度")
    month: Optional[int] = Field(None, ge=1, le=12, description="月")
    question: Optional[str] = Field(None, min_length=1, max_length=1000, description="問題文")
    answer: Optional[str] = Field(None, min_length=1, max_length=10000, description="解答")
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