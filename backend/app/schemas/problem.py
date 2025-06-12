# app/schemas/problem.py
from pydantic import BaseModel

# APIレスポンスで返す問題のスキーマ
class Problem(BaseModel):
    id: int
    subject: str
    year: int
    month: int
    question: str
    answer: str

    class Config:
        from_attributes = True # ORMモデルから変換できるようにする設定