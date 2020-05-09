from flask import Blueprint
from flask_restful import Api
from app.users.api import Users, IdCheck, NicknameCheck

users_bp = Blueprint('users', __name__)

api = Api(users_bp)


api.add_resource(Users, '')

api.add_resource(IdCheck, '/check-duplicate/id/<string:id>')
api.add_resource(NicknameCheck, '/check-duplicate/nickname/<string:nickname>')