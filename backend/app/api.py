# app/api.py
from fastapi import APIRouter
from .routes import problems

api_router = APIRouter()
api_router.include_router(problems.router, prefix="/problems", tags=["problems"])