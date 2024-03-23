#!/usr/bin/python3
"""a module that handles registration"""
from flask import request, abort, jsonify
from api.model.user import User
from api.v1.auth.auth import Auth
from api.v1.controllers.mailer import send_mail
from api.v1.views import app_views


AUTH = Auth()

message = "<html>\
<h2>Verify your Email</h2>\
<p>This is to welcome you to the refintinco solutions <br>\
our notifcation mail is to information you of your <br>\
successful registration process. <br>\
</body>\
</html>"





@app_views.route('/users', methods=['POST'], strict_slashes=False)
@app_views.route('/invites?user=<refer>', methods=['POST'], strict_slashes=False)
def register(refer=None):
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
        print(member)
        email = data['email']
        refer = data.get('referral')
        print(member)
        if refer:
            data['user_id'] = member.id
            refer = AUTH.refer_users(**data)
            print(refer)
    except ValueError:
        return jsonify({'message': 'User already exist with this email'}), 400
    return jsonify({'email': email, 'message': 'User registered'})