#!/usr/bin/python3
"""a module for the backend api"""
from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail
from api.v1.config import Config
from api.v1.views import app_views
from api.v1.config import Config


app = Flask(__name__)
app.config.from_object(Config)
Config.init_app(app)
mail = Mail()
mail.init_app(app)
CORS(app, resources={r'/api/v1/*': {'origins': '*'}})
app.register_blueprint(app_views)


@app.errorhandler
def not_found_error(error):
    """Not found error"""
    return jsonify({'error': 'Not found'}), 404


if __name__ == '__main__':
    app.run()