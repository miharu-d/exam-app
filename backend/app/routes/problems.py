# app/routes/problems.py
from fastapi import APIRouter
from typing import List, Optional
from ..schemas import problem as problem_schema
from ..crud import problem as problem_crud

router = APIRouter()

@router.get("/search", response_model=List[problem_schema.Problem])
def search_problems_endpoint(subject: Optional[str] = None, year: Optional[str] = None):
    # 科目や年度で問題を検索する
    problems = problem_crud.get_problems(subject=subject, year=year)
    return problems