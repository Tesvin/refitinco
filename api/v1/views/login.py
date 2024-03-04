#!/usr/bin/python3
"""views"""
from flask import jsonify, abort, redirect, request
from api.v1.auth.auth import Auth
from api.model.user import User
from api.v1.views import app_views

AUTH = Auth()

@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """GET api/v1/"""
    data = request.get_json()
    if not data:
        abort(404, 'Not JSON')
    require_field = ['email', 'password']
    for field in require_field:
        if field not in data:
            return jsonify({'message': f'Missing {field}'}), 400
    email = data['email']
    pwd = data['password']
    session_id = AUTH.create_session(email)
    if session_id is None or not AUTH.valid_login(email, pwd):
        abort(401)
    response = jsonify({'email': email, 'message': 'logged in'})
    response.set_cookie('session_id', session_id)
    return response


@app_views.route('/sessions', methods=['DELETE'], strict_slashes=False)
def logout():
    """a method that logout user"""
    session_id = request.cookies.get('session_id')
    user = AUTH.get_user_from_session_id(session_id)
    if session_id is None or user is None:
        abort(403)
    AUTH.destroy_session(user.id)
    return redirect('/')


@app_views.route('/reset_password', methods=['POST'], strict_slashes=False)
def reset_password():
    """a method that reset password"""
    email = request.form.get('email')
    try:
        token = AUTH.get_reset_password_token(email)
    except ValueError:
        abort(403)
    return jsonify({'email': email, 'reset_token': token})


@app_views.route('/reset_password', methods=['PUT'], strict_slashes=False)
def update_password():
    """a method that update user password"""
    email = request.form.get('email')
    token = request.form.get('reset_token')
    pwd = request.form.get('new_password')
    try:
        AUTH.update_password(token, pwd)
    except ValueError:
        abort(403)
    return jsonify({'email': email, 'message': 'Password updated'}), 200