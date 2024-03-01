#!/usr/bin/python3
"""Database module"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.orm.session import Session
from model.user import Base, User


class DB:
    """Database Class"""

    def __init__(self) -> None:
        """Initialize a new DB instance"""
        self._engine = create_engine('sqlite:///refitinco.db', echo=False)
        Base.metadata.drop_all(self._engine)
        Base.metadata.create_all(self._engine)
        self.__session = None

    @property
    def _session(self) -> Session:
        """Memoized session object"""
        if self.__session is None:
            DBSession = sessionmaker(bind=self._engine)
            self.__session = DBSession()
        return self.__session
    
    def add_user(self, **kwargs) -> User:
        """a method that add user"""
        if kwargs:
            user = User(**kwargs)
            self._session.add(user)
            self._session.commit()
            return user
    
    def find_user_by(self, **kwargs) -> User:
        """a method that find the user"""
        for key, value in kwargs.items():
            if not hasattr(User, key):
                raise InvalidRequestError()
        user = self._session.query(User).filter_by(**kwargs).first()
        if user is None:
            raise NoResultFound()
        return user
    
    def update_user(self, user_id: int, **kwargs) -> None:
        """a method that update user"""
        user = self.find_user_by(id=user_id)
        if user is None:
            raise ValueError('User not found')
        valid_attributes = set(User.__table__.columns.keys())
        for attr in kwargs.keys():
            if attr not in valid_attributes:
                raise ValueError(f'Invalid attribute: {attr}')
        for key, value in kwargs.items():
            setattr(user, key, value)
        self._session.commit()