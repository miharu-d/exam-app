# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import api_router # api.pyからルーターをインポート

app = FastAPI(title="試験問題システム API")

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router) # APIルーターをアプリに登録

@app.get("/")
def read_root():
    return {"message": "Welcome to Exam System API!"}