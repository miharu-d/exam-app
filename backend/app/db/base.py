from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# データベースエンジンを作成
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# データベースセッションを作成するためのクラス
SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

# FastAPIの依存性注入でデータベースセッションを提供するための関数
async def get_db():
    async with SessionLocal() as session:
        yield session

# 初期化用の関数 (FastAPIのstartupイベントで呼び出す)
async def init_db():
    async with engine.begin() as conn:
        # Base.metadata.create_all を非同期で実行するために run_sync を使う
        await conn.run_sync(Base.metadata.create_all)