from flask import Blueprint

from flask_restful import Api, Resource, reqparse


from app.data.api import GetData, GetWordCloud


data_bp = Blueprint('data', __name__)

api = Api(data_bp)

api.add_resource(GetData, '')
api.add_resource(GetWordCloud, '/wordcloud')
