# backend/app/api/endpoints/users.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.db.base import SessionLocal
from app.crud import user as crud_user
from app.schemas.user import UserCreate, UserResponse
from app.core.security import get_password_hash
from app.db.base import get_db
from app.api.endpoints.auth import get_current_user

router = APIRouter(
    tags=["Users"],
)

# 新しいユーザーを登録するAPIエンドポイント
@router.post("/users/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await crud_user.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="ユーザー名が既に登録されています")
    db_user = await crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="メールアドレスが既に登録されています")
    
    hashed_password = get_password_hash(user.password)
    user_in_db = UserCreate(
        username=user.username,
        email=user.email,
        password=hashed_password # ハッシュ化されたパスワードを渡す
        )
    new_user = await crud_user.create_user(db=db, user=user_in_db)
    return new_user