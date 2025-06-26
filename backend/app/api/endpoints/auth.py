from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError, jwt
from datetime import timedelta
from typing import Optional

from app.db.base import get_db
from app.crud import user as crud_user
from app.schemas.user import UserResponse
from app.core.security import create_access_token
from app.core.config import settings

# auto_error=Falseにすることで、Authorizationヘッダーが無くてもエラーにならず、後続のCookie認証へ処理を移すことができる
oauth2_scheme = OAuth2PasswordBearer (
    tokenUrl = f"{settings.API_V1_STR}/auth/token", 
    auto_error = False
)

# ルーターの定義
router = APIRouter(
    tags = ["Auth"],
)

async def get_current_user (
    request: Request,
    token_from_header: Optional[str] = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):
    # 現在の認証済みユーザーを取得。
    # まずAuthorizationヘッダーのBearerトークンを確認し、なければリクエストのCookieを確認。
    credentials_exception = HTTPException(
        status_code = status.HTTP_401_UNAUTHORIZED,
        detail = "認証情報が無効です",
        headers = {"WWW-Authenticate": "Bearer"},
    )

    # ヘッダーからのトークンを優先し、なければCookieから取得
    token = token_from_header
    if not token:
        token = request.cookies.get("authToken")

    # それでもトークンがなければ認証失敗
    if not token:
        raise credentials_exception

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

@router.post("/token", response_model=UserResponse, summary="ユーザー名とパスワードでログインし、Cookieセットとユーザー情報取得")
async def login_for_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    #  ユーザーを認証し、成功した場合にHttpOnly CookieにJWTをセットし、レスポンスボディでユーザー情報を返す
    user = await crud_user.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException (
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = "ユーザー名またはパスワードが間違っています",
            headers = {"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token (
        data = {"sub": str(user.id)},
        expires_delta = access_token_expires
    )

    response.set_cookie (
        key = "authToken",
        value = access_token,
        httponly = True,
        secure = settings.COOKIE_SECURE,
        samesite = "lax",
        path = "/",
        max_age = int(access_token_expires.total_seconds()),
    )
    
    return user

@router.post("/logout", summary="ログアウトし、Cookieを削除")
async def logout(response: Response):
    # 認証用Cookieを削除してログアウト
    response.delete_cookie (key = "authToken", path = "/")
    return { "message": "Logout successful" }

# 現在の認証済みユーザーの情報を返す
@router.get("/users/me/", response_model=UserResponse, summary="現在のユーザー情報を取得")
async def read_users_me (current_user: UserResponse = Depends(get_current_user)):
    return current_user