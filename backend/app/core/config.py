# backend/app/core/config.py
from pydantic_settings import BaseSettings,SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    SECRET_KEY: str = Field(..., description="JWT Secret Key")
    ALGORITHM: str = Field(..., description="JWT Algorithm")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(..., description="Access token expiration minutes")
    API_V1_STR: str = Field(..., description="API Version String")

    DATABASE_URL: str = Field(..., description="Database connection URL")

    APP_ENV: str = Field(..., description="Application environment (e.g., development, production)")

    model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)

settings = Settings()