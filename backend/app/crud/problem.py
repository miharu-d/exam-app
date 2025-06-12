# backend/app/crud/problem.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from typing import List, Optional

from app.models.problem import Problem
from app.schemas.problem import ProblemCreate, ProblemUpdate # スキーマもインポート

# 問題をIDで取得
async def get_problem(db: AsyncSession, problem_id: int):
    result = await db.execute(select(Problem).where(
        Problem.id == problem_id,
        Problem.deleted_at.is_(None) # 論理削除を考慮
    ))
    return result.scalars().first()

# 問題を複数取得（検索機能など）
async def get_problems(
    db: AsyncSession, 
    subject: Optional[str] = None, 
    year: Optional[int] = None, 
    month: Optional[int] = None, 
    skip: int = 0, 
    limit: int = 100
) -> List[Problem]:
    query = select(Problem).where(Problem.deleted_at.is_(None)) # 論理削除を考慮

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
    # created_at, updated_at はモデル定義で server_default=func.now() で自動設定される
    db_problem = Problem(**problem.model_dump(), user_id=user_id)
    db.add(db_problem)
    await db.commit()
    await db.refresh(db_problem)
    return db_problem

# 問題を更新（論理削除を含む）
async def update_problem(db: AsyncSession, problem_id: int, problem_update: ProblemUpdate):
    # まず対象の問題を取得
    db_problem = await get_problem(db, problem_id)
    if not db_problem:
        return None # 問題が見つからない

    # 更新したい属性を適用
    for key, value in problem_update.model_dump(exclude_unset=True).items():
        setattr(db_problem, key, value)
    
    # updated_at はモデル定義で onupdate=func.now() で自動更新される

    await db.add(db_problem) # 変更をセッションに反映
    await db.commit()
    await db.refresh(db_problem)
    return db_problem

# 論理削除 (deleted_atを設定)
async def soft_delete_problem(db: AsyncSession, problem_id: int):
    db_problem = await get_problem(db, problem_id) # get_problemはdeleted_atがNoneのものを取得
    if not db_problem:
        return None

    db_problem.deleted_at = func.now() # 現在時刻を設定して論理削除
    await db.add(db_problem)
    await db.commit()
    await db.refresh(db_problem)
    return db_problem

# 物理削除 (テスト用など、通常のAPIでは使わない)
async def hard_delete_problem(db: AsyncSession, problem_id: int):
    db_problem = await db.execute(select(Problem).where(Problem.id == problem_id))
    problem_to_delete = db_problem.scalars().first()
    if not problem_to_delete:
        return None
    await db.delete(problem_to_delete)
    await db.commit()
    return {"message": "Problem permanently deleted"}