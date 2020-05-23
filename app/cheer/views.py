from flask import Blueprint

from flask_restful import Api, Resource, reqparse


from app.cheer.api import _Cheer


cheer_bp = Blueprint('cheer', __name__)

api = Api(cheer_bp)

api.add_resource(_Cheer, '')
