from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User as UserModel
from app.schemas.user import UserCreate
from app.core.security import verify_password, get_password_hash
from typing import Optional
from datetime import datetime

async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[UserModel]:
    result = await db.execute(select(UserModel).where(UserModel.id == user_id))
    return result.scalars().first()

async def get_user_by_email(db: AsyncSession, email: str) -> Optional[UserModel]:
    result = await db.execute(select(UserModel).where(UserModel.email == email))
    return result.scalars().first()

async def create_user_from_schema(db: AsyncSession, user_in: UserCreate) -> UserModel:
    hashed_password = get_password_hash(user_in.password)
    db_user = UserModel(
        email=user_in.email,
        hashed_password=hashed_password,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


async def authenticate_user(db: AsyncSession, email: str, password: str) -> Optional[UserModel]:
    user = await get_user_by_email(db, email=email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
