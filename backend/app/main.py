# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.base import Base, engine
from app.api.endpoints import problems
from app.api.endpoints import auth
from app.api.endpoints import users

import app.models.user
import app.models.problem

app = FastAPI(title="試験問題システム API")

origins = [
    "http://localhost:3000",
    "http://localhost:8000"
]

# データベースのテーブルを作成（アプリケーション起動時に一度だけ実行）
@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(problems.router, prefix="/api/problems")
app.include_router(auth.router, prefix="/api/auth") 
app.include_router(users.router, prefix="/api/users")

@app.get("/")
def read_root():
    return {"message": "Welcome to Exam System API!"}