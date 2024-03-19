#!/usr/bin/python3
"""a module that handles registration"""
from flask import request, abort, jsonify
from api.model.user import User
from api.v1.auth.auth import Auth
from api.v1.controllers.mailer import send_mail
from api.v1.views import app_views
from api.v1.views.info import message


AUTH = Auth()

@app_views.route('/users', methods=['POST'], strict_slashes=False)
@app_views.route('/invites?user=<refer>', methods=['POST'], strict_slashes=False)
def register(refer):
    """a module that register user"""
    try:
        data = request.get_json()
        if not data:
            abort(403, 'Not JSON data')
        required_field = ['firstname', 'lastname', 'email', 'password']
        for field in required_field:
            if field not in data:
                return jsonify({'message': f'Missing {field}'}), 400
        title = 'Email Verification'
        response, status_code = send_mail(data['email'], title, message)
        if status_code == 500:
            abort(400, response)
        member = AUTH.register_user(**data)
        email = data['email']
        refer = data.get('referral')
        if refer:
            print(member)
            data['user_id'] = member.id
            refer = AUTH.refer_users(**data)
            print(refer)
    except ValueError:
        return jsonify({'message': 'email already registered'}), 400
    return jsonify({'email': email, 'message': 'User registered'})