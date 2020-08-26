from flask import Blueprint

from flask_restful import Api, Resource, reqparse


from app.tag.api import GetTag


tag_bp = Blueprint('tag_bp', __name__)

api = Api(tag_bp)

api.add_resource(GetTag, '')
