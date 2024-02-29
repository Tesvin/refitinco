#!/usr/bin/python3
"""views"""
from flask import jsonify, abort
from api.v1.views import app_views


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """GET api/v1/"""
    pass