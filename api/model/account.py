#!/usr/bin/python3
"""Account module"""
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Account(Base):
    """Account class"""
    __tablename__ = 'account'
    
    id = Column(Integer, primary_key=True)
    units = Column(Integer, nullable=False, default=0)
    bonus = Column(Integer, nullable=False, default=0)
    amount = Column(Integer, nullable=False, default=0)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'))
    status = Column(String, nullable=False, default='IDLE')
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)