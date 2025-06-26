from pydantic import BaseModel
from typing import Optional

# アクセストークンのスキーマ
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# トークン内のデータのスキーマ
class TokenData(BaseModel):
    username: Optional[str] = None