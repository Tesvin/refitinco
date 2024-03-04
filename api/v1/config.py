#!/usr/bin/python3
"""Configuration module"""
from dotenv import load_dotenv
from os import getenv


load_dotenv()

class Config:
    """a config class"""
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = getenv('MAIL_USERNAME')
    MAIL_PASSWORD = getenv('MAIL_PASSWORD')

    @classmethod
    def init_app(cls, app):
        pass