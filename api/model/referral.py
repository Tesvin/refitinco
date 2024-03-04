#!/usr/bin/python3
"""a referral module"""
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from user import User


Base = declarative_base

class Referral(Base):
    """referral class"""
    __tablename__ = 'referral'

    id = Column(Integer, primary_key=True)
    code = Column(String, nullable=False, default='')
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE', onupdate='CASCADE'))
    users = relationship(User, backref='users')