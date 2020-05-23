from flask import Blueprint

from flask_restful import Api, Resource, reqparse


from app.difficult.api import _Difficult


difficult_bp = Blueprint('difficult', __name__)

api = Api(difficult_bp)

api.add_resource(_Difficult, '')
