# backend/app/api/endpoints/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt

from app.db.base import SessionLocal
from app.crud import user as crud_user
from app.schemas.token import Token, TokenData
from app.schemas.user import UserResponse
from app.core.security import verify_password, get_password_hash # パスワードユーティリティ
from app.core.config import settings

# JWTトークン検証用の秘密鍵とアルゴリズム
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256" # JWTのアルゴリズム

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")

router = APIRouter()

# データベースセッションを取得するための依存性注入関数
async def get_db():
    async with SessionLocal() as session:
        yield session

# JWTトークンを作成
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# JWTトークンを検証し、現在のユーザーを返す
async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="認証情報が無効です",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(username=email)
    except JWTError:
        raise credentials_exception
    
    # メールアドレスでユーザーを取得
    user = await crud_user.get_user_by_email(db, email=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# ログインAPIエンドポイント
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await crud_user.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="ユーザー名またはパスワードが間違っています",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # ここで JWT トークンを生成
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# 現在のユーザー情報を取得するAPIエンドポイント
@router.get("/users/me/", response_model=UserResponse)
async def read_users_me(current_user: UserResponse = Depends(get_current_user)):
    return current_user