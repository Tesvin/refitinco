#!/usr/bin/python3
"""a module for mail sender"""
from flask_mail import Message, Mail
from flask import jsonify
from api.v1.views import current_app
from os import getenv
from dotenv import load_dotenv


load_dotenv()
def send_mail(receiver, title, message):
    """a function that send verfication"""
    mail = Mail(current_app)
    body = message
    with mail.connect():
        msg = Message(
            subject=title,
            sender=getenv('MAIL_USERNAME'),
            recipients=[receiver],
            html=body)
        try:
            mail.send(msg)
            return jsonify({'message': 'Email send successfully'}), 200
        except Exception as e:
            return jsonify({'message': f'Error sending mail: {str(e)}'}), 500