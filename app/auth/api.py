from app.db import *
from flask_restful import Resource, reqparse
import bcrypt
from flask import request
import jwt
from config import SECRET_KEY
from datetime import datetime
from datetime import timedelta



# server.py

class Auth(Resource):

    def get(self):
        access_token = request.headers.get('Authorization').split()
        if len(access_token) < 2:
            return {"message": "로그인 토큰이 필요합니다."}, 400
        access_token = access_token[1]

        if access_token is not None:
            try:
                payload = jwt.decode(access_token, SECRET_KEY, "HS256")
            except jwt.InvalidTokenError:
                payload = None

            if payload is None:
                return {"message": "토큰이 유효하지 않습니다."}, 401

            return payload, 200

        else:

            return {"message": "로그인 토큰이 필요합니다."}, 400

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', required=True, type=str)
        parser.add_argument('password', required=True, type=str)
        args = parser.parse_args()
        row = User.query.filter_by(id=args["id"]).first()
        if row and bcrypt.checkpw(args["password"].encode("UTF-8"), row.password.encode("UTF-8")):
            payload = {
                "data":
                    {
                        "id": row.id,
                        "nickname": row.nickname,
                    },
                "exp": datetime.utcnow() + timedelta(seconds=60 * 60 * 3)
            }

            token = jwt.encode(payload, SECRET_KEY, "HS256").decode("UTF-8")
            return {"accessToken": token}, 200
        else:
            return {"message": "ID나 비밀번호가 옳지 않습니다."}, 404


