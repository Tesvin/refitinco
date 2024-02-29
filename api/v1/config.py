#!/usr/bin/python3
"""Configuration module"""

class Config:
    """a config class"""
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USERNAME = ''
    MAIL_PASSWORD = ''

    @classmethod
    def init_app(cls, app):
        pass