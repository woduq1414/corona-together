from flask import Blueprint

from flask_restful import Api, Resource, reqparse


from app.auth.api import Auth


auth_bp = Blueprint('auth', __name__)

api = Api(auth_bp)

api.add_resource(Auth, '')
