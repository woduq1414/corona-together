from flask import Blueprint

from flask_restful import Api, Resource, reqparse


from app.cheer.api import _Cheer, _DeleteCheer


cheer_bp = Blueprint('cheer_bp', __name__)

api = Api(cheer_bp)

api.add_resource(_Cheer, '')
api.add_resource(_DeleteCheer, '/delete')
