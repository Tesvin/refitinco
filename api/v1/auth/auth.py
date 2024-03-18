#!/usr/bin/python3
"""a module that handle authentication"""
import bcrypt
from api.v1.db import DB
from uuid import uuid4
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import InvalidRequestError
from api.model.user import User
from api.model.referral import Referral


def _hash_password(password: str) -> str:
    """a method that handles hashing of password"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def _generate_uuid() -> str:
    """a method that generate uuid"""
    return str(uuid4())


class Auth:
    """Auth class to interact with the authentication of DBase"""

    def __init__(self):
        """Initialization"""
        self._db = DB()

    def register_user(self, **kwargs) -> User:
        """a method that register users"""
        try:
            email = kwargs.get('email')
            password = kwargs.get('password')
            user = self._db.find_user_by(email=email)
            if user:
                raise ValueError(f"<user's {email} already exists")
        except (InvalidRequestError, NoResultFound):
            pwd = _hash_password(password)
            kwargs['password'] = pwd
            kwargs['refer_code'] = str(uuid4())
            user = self._db.add_user(**kwargs)
            return user
        
    def valid_login(self, email: str, password: str) -> bool:
        """a method that validate credentials"""
        try:
            user = self._db.find_user_by(email=email)
            pwd = user.hashed_password
            return bcrypt.checkpw(password.encode('utf-8'), pwd)
        except (InvalidRequestError, NoResultFound):
            return False
        return False
        
    def create_session(self, email: str):
        """a method that create a session"""
        try:
            user = self._db.find_user_by(email=email)
            if user:
                session_id = _generate_uuid()
                self._db.update_user(user.id, session_id=session_id)
        except (InvalidRequestError, NoResultFound):
            return None
        return session_id
        
    def get_user_from_session_id(self, session_id: str) -> User:
        """a method that get the user session id"""
        if session_id is None:
            return None
        try:
            user = self._db.find_user_by(session_id=session_id)
        except (InvalidRequestError, NoResultFound):
            return None
        return user
        
    def destroy_session(self, user_id) -> None:
        """a method that destroy a session"""
        try:
            user = self._db.find_user_by(id=user_id)
            if user:
                self._db.update_user(user_id, session_id=None)
        except (InvalidRequestError, NoResultFound):
            return None
        return None
        
    def get_reset_password_token(self, email: str):
        """a method that reset password token"""
        try:
            user = self._db.find_user_by(email=email)
            token = _generate_uuid()
            self._db.update_user(user.id, reset_token=token)
        except NoResultFound:
            raise ValueError
        return token
        
    def update_password(self, reset_token: str, pwd: str) -> None:
        """a method that update password"""
        try:
            user = self._db.find_user_by(reset_token=reset_token)
            self._db.update_user(user.id, hashed_password=_hash_password(pwd))
            user.reset_token = None
        except NoResultFound:
            raise ValueError
            
    def refer_users(self, **kwargs: dict):
        """a method that register downlines"""
        try:
            code = kwargs['referral']
            user = self._db.find_user_by(referral=code)
            if user:
                refer = self._db.add_referral(**kwargs)
                return refer
        except NoResultFound:
            raise ValueError