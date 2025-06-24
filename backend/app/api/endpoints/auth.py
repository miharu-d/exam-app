# backend/app/api/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt

from app.db.base import get_db
from app.crud import user as crud_user
from app.schemas.token import Token
from app.schemas.user import UserResponse, UserCreate
from app.core.security import create_access_token, verify_password, get_password_hash
from app.core.config import settings
from app.models.user import User as UserModel

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/token")

# ルーターの定義
router = APIRouter(
    tags=["Auth"],
)

# JWTトークンを検証し、現在のユーザーを返す
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="認証情報が無効です",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await crud_user.get_user_by_id(db, user_id=int(user_id))
    if user is None:
        raise credentials_exception
    return user

# ログインAPIエンドポイント
@router.post("/token", response_model=Token, summary="ユーザー名とパスワードでログインし、アクセストークンを取得")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    user = await crud_user.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ユーザー名またはパスワードが間違っています",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # settingsからトークンの有効期限を取得し、create_access_token に渡す
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return {"access_token": access_token, "token_type": "bearer"}


# 現在のユーザー情報を取得するAPIエンドポイント
@router.get("/users/me/", response_model=UserResponse, summary="現在のユーザー情報を取得")
async def read_users_me(current_user: UserResponse = Depends(get_current_user)):
    return current_user