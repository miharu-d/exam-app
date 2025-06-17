# backend/app/api/endpoints/problems.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.db.base import get_db
from app.schemas.problem import ProblemResponse, ProblemCreate, ProblemUpdate
from app.crud import problem as crud_problem

router = APIRouter()

@router.get("/problems/", response_model=List[ProblemResponse])
async def read_problems(
    subject: Optional[str] = None,
    year: Optional[int] = None,
    month: Optional[int] = None,
    db: AsyncSession = Depends(get_db)
):
    # CRUDレイヤーの関数を呼び出す
    problems = await crud_problem.get_problems(db, subject=subject, year=year, month=month)
    return problems

@router.post("/problems/", response_model=ProblemResponse)
async def create_new_problem(problem: ProblemCreate, db: AsyncSession = Depends(get_db)):
    # user_id は認証から取得するなどする (ここでは仮に1とする)
    user_id = 1 # 仮のユーザーID
    new_problem = await crud_problem.create_problem(db, problem, user_id)
    return new_problem