#!/usr/bin/python3
"""Init File"""
from flask import Blueprint, current_app


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.views.login import *
from api.v1.views.register import *
from api.v1.views.payment import *