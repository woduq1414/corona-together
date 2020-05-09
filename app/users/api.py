from app.db import *
from flask_restful import Resource, reqparse
import bcrypt

from app.users.form import *
from werkzeug import ImmutableMultiDict


class Users(Resource):

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True, type=str)
        parser.add_argument('password', required=True, type=str)
        parser.add_argument('nickname', required=True, type=str)
        args = parser.parse_args()

        form = RegisterForm(ImmutableMultiDict(args))

        if form.validate():

            count = User.query.filter((User.id == form.id.data) | (User.nickname == form.nickname.data)).count()
            if count > 0:
                return {"message": "이미 존재하는 ID나 별명입니다."}, 409

            hashedPassword = bcrypt.hashpw(form.password.data.encode('UTF-8'), bcrypt.gensalt()).decode('UTF-8')

            newUser = User(id=form.id.data, password=hashedPassword, nickname=form.nickname.data)

            db.session.add(newUser)
            db.session.commit()

            return {"data":
                {
                    "id": newUser.id,
                    "nickname": newUser.nickname
                }
                   }, 201
        else:
            return {"message": "파라미터 값이 유효하지 않습니다."}, 400


class IdCheck(Resource):

    def get(self):

        c = User.query.filter_by(id=id).count()
        if c != 0:
            return {"message": "이미 존재하는 ID 입니다."}, 409
        else:
            return {"data":
                {
                    "id": id
                }
                   }, 200


class NicknameCheck(Resource):

    def get(self):

        c = User.query.filter_by(nickname=nickname).count()
        if c != 0:
            return {"message": "이미 존재하는 별명 입니다."}, 409
        else:
            return {"data":
                {
                    "nickname": nickname
                }
                   }, 200
