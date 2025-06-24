# backend/app/crud/problem.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from typing import List, Optional
from datetime import datetime

from app.models.problem import Problem
from app.schemas.problem import ProblemCreate, ProblemUpdate


# 問題をIDで取得
async def get_problem(db: AsyncSession, problem_id: int, user_id: int) -> Optional[Problem]:
    result = await db.execute(select(Problem).where(
        Problem.id == problem_id,
        Problem.deleted_at.is_(None),
        Problem.user_id = user_id
    ))
    return result.scalars().first()

# 問題を複数取得（検索機能など）
async def get_problems(
    db: AsyncSession, 
    subject: Optional[str] = None, 
    year: Optional[int] = None, 
    month: Optional[int] = None,
    user_id: Optional[int] = None,
    skip: int = 0, 
    limit: int = 100
) -> List[Problem]:
    query = select(Problem).where(Problem.deleted_at.is_(None)).where(Problem.user_id == user_id)

    if subject:
        query = query.where(Problem.subject == subject)
    if year:
        query = query.where(Problem.year == year)
    if month:
        query = query.where(Problem.month == month)

    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()

# 問題を作成
async def create_problem(db: AsyncSession, problem: ProblemCreate, user_id: int):
    db_problem = Problem(
        **problem.dict(), # Pydanticモデルから辞書に変換
        user_id=user_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(db_problem)
    await db.commit()
    await db.refresh(db_problem)
    return db_problem
