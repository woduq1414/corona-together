from flask import Blueprint

from flask_restful import Api, Resource, reqparse


from app.difficult.api import _Difficult, _DeleteDifficult


difficult_bp = Blueprint('difficult_bp', __name__)



api = Api(difficult_bp)


api.add_resource(_Difficult, '')
api.add_resource(_DeleteDifficult, '/delete')
