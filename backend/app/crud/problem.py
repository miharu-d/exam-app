# app/crud/problem.py
from typing import List, Optional
from ..schemas import problem as problem_schema

dummy_db = [
    {"id": 1, "subject": "統計学", "year": 2023, "month": 4, "question": "p値とは何か、説明してください。", "answer": "帰無仮説が真であると仮定したとき、観測されたデータ以上に極端なデータが得られる確率。"},
    {"id": 2, "subject": "線形代数", "year": 2022, "month": 4, "question": "固有値と固有ベクトルの関係を述べてください。", "answer": "行列Aに対して、Av = λvを満たすゼロでないベクトルvが固有ベクトル、スカラーλが固有値。"},
    {"id": 3, "subject": "統計学", "year": 2021, "month": 4, "question": "第一種の過誤と第二種の過誤の違いは？", "answer": "第一種の過誤は真である帰無仮説を棄却する誤り、第二種の過誤は偽である帰無仮説を採択する誤り。"},
    {"id": 4, "subject": "微分積分", "year": 2023, "month": 4, "question": "テイラー展開の目的を説明してください。", "answer": "複雑な関数を、ある点の周りで多項式によって近似すること。"},
]

def get_problems(subject: Optional[str] = None, year: Optional[str] = None) -> List[dict]:
    results = dummy_db
    if subject:
        results = [p for p in results if subject.lower() in p["subject"].lower()]
    if year and year.isdigit():
        results = [p for p in results if p["year"] == int(year)]
    return results