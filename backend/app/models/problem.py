from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db.base import Base

class Problem(Base):
    __tablename__ = "problems"
    id = Column(Integer, primary_key=True)
    subject = Column(String(255), index=True)
    year = Column(Integer)
    month = Column(Integer)
    question = Column(Text, nullable=False)
    answer = Column(Text)
    hint = Column(Text)
    explanation = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id", name="fk_problems_user_id"), nullable=False, index=True) 
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime, nullable=True)

    owner = relationship('User', back_populates="problems")