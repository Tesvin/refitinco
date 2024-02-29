#!/usr/bin/python3
"""Account module"""
from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Account:
    """Account class"""
    __tablename__ = 'account'
    
    id = Column(Integer, primary_key=True)
    units = Column(Integer, nullable=False, default=0)
    bonus = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)