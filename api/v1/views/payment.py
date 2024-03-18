#!/usr/bin/python3
"""a module that handle payment"""
"""a module that handles registration"""
from flask import request, abort, jsonify
from api.model.user import User
from api.v1.auth.auth import Auth
from api.v1.views import app_views

AUTH = Auth()

@app_views.route('/payment', method=['POST'], strict_slashes=False)
def payment():
    pass
