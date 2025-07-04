import logging;
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from app.db.base import get_db
from app.schemas.problem import ProblemResponse, ProblemCreate, ProblemUpdate
from app.crud import problem as crud_problem
from app.models.user import User as UserModel
from app.api.endpoints.auth import get_current_user

router = APIRouter(
    tags=["Problems"],
    dependencies=[Depends(get_current_user)] # Problemsのapiは認証必須
)

@router.get("/", response_model=List[ProblemResponse], summary="条件に基づいて問題リストを取得する")
async def get_problems(
    subject: Optional[str] = None,
    year: Optional[int] = None,
    month: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    # ユーザーIDを取得
    user_id = current_user.id

    # CRUDレイヤーの関数を呼び出す
    problems = await crud_problem.get_problems(
        db,
        subject=subject,
        year=year,
        month=month,
        user_id=user_id,
    )
    return problems

@router.post("/", response_model=ProblemResponse, status_code=status.HTTP_201_CREATED, summary="新しい問題を登録") 
async def create_problem(
    problem: ProblemCreate,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
    ):

    # ユーザーIDを取得
    user_id = current_user.id

    # CRUDレイヤーのcreate_problem関数を呼び出す
    new_problem = await crud_problem.create_problem(db, problem, user_id)
    return new_problem

@router.get("/{problem_id}", response_model=ProblemResponse, summary="特定の問題を取得")
async def get_problem_by_id(
    problem_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    user_id = current_user.id
    problem = await crud_problem.get_problem(db, problem_id, user_id)
    if not problem:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ご指定の問題が見つかりませんでした。")
    return problem

@router.put("/{problem_id}", response_model=ProblemResponse, summary="問題データの更新")
async def update_problem_by_id(
    problem_id: int,
    problem: ProblemUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    user_id = current_user.id
    result = await crud_problem.update_problem(db, problem_id, problem, user_id)
    if not result:
        raise HTTPException(
            status_code=404,
            detail="指定された問題が見つからないか、更新する権限がありません",
        )
    return result