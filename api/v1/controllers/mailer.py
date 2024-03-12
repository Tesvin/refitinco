#!/usr/bin/python3
"""a module for mail sender"""
from flask_mail import Message, Mail
from api.v1.views import jsonify, current_app
from os import getenv
from dotenv import load_dotenv


load_dotenv()
def send_mail(receiver):
    """a function that send verfication"""
    mail = Mail(current_app)
    body = "<html><body>Welcome to Refitinco</body></html>"
    with mail.connect():
        msg = Message(
            subject='Email Verification',
            sender=getenv('MAIL_USERNAME'),
            recipients=[receiver],
            html=body)
        try:
            mail.send(msg)
            return jsonify({'message': 'Email send successfully'}), 200
        except Exception as e:
            return jsonify({'message': f'Error sending mail: {str(e)}'}), 500