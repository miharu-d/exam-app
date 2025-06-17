# backend/app/schemas/token.py

from pydantic import BaseModel
from typing import Optional

# アクセストークンのスキーマ
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# トークン内のデータ（ペイロード）のスキーマ
class TokenData(BaseModel):
    username: Optional[str] = None