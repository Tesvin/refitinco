#!/usr/bin/python3
"""company module"""
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, DateTime


Base = declarative_base()

class Company(Base):
    """a company model"""
    __tablename__ = 'company'
    name = Column(String, default='Refintic')
    units = Column(Integer, nullable=False, default=15000)
    purchase = Column(Integer, nullable=False, default=0)
    reserved = Column(Integer, nullable=False, default=15000)