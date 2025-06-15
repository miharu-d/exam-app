# backend/app/core/security.py

from passlib.context import CryptContext

# パスワードのハッシュ化アルゴリズムを定義
# bcrypt は現代的で安全なアルゴリズムです
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """平文のパスワードとハッシュ化されたパスワードを比較し、一致するか検証する"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """平文のパスワードをハッシュ化する"""
    return pwd_context.hash(password)