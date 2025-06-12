# backend/app/db/base.py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# データベースエンジンを作成
# connect_argsはSQLiteでのみ必要だったため削除
engine = create_async_engine(settings.DATABASE_URL)

# データベースセッションを作成するためのクラス
SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

# SQLAlchemyモデルが継承するためのベースクラス
class Base(DeclarativeBase):
    pass

# FastAPIの依存性注入でデータベースセッションを提供するための関数
async def get_db():
    async with SessionLocal() as session:
        yield session