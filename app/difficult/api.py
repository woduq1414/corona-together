from app.db import *
from flask_restful import Resource, reqparse
import bcrypt
from flask import request
import jwt
from config import SECRET_KEY
from datetime import datetime
from datetime import timedelta
import time
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# server.py

class _Difficult(Resource):

    def get(self):
        tagName = request.args.get("tagName", "")
        print(request.args)
        # tagName = "학생"
        tag = Tag.query.filter_by(tagName=tagName).first()
        if tag is None:
            return {"error": "태그를 찾을 수 없습니다."}, 404
        tagSeq = tag.seq

        difficult_list = Difficult.query.filter_by(tagSeq=tagSeq).order_by(Difficult.seq.desc()).limit(100)

        return [{
            "seq" : difficult.seq,
            "content" : difficult.content,
            "title" : difficult.title,
            "password" : True if difficult.password is not None else False
        } for difficult in difficult_list], 200



    def post(self):

        print(request.json)
        value = request.json

        errors = []
        if not 0 < len(value["title"]):
            errors.append("제목이 비어있습니다.")
        if len(value["title"]) > 100:
            errors.append("제목은 100자까지 가능합니다.")
        if not 0 < len(value["content"]):
            errors.append("내용이 비어있습니다.")
        if len(value["content"]) > 2000:
            errors.append("내용은 2000자까지 가능합니다.")

        print(errors)

        if len(errors) == 0:

            tag = Tag.query.filter_by(tagName=value["tagName"]).first()

            row = Difficult(title=value["title"],
                            content=value["content"],
                            tagSeq=tag.seq,
                            date=datetime.now(),
                            ip= request.headers['X-Forwarded-For'] if 'X-Forwarded-For' in request.headers else request.remote_addr,
                            password=value.get("password", None)
                            )

            db.session.add(row)
            db.session.commit()

            return {
                       "result": "success"
                   }, 201

        else:
            return {"error": errors}, 400


class _DeleteDifficult(Resource):



    def post(self):
        print(request.json)
        value = request.json

        difficult = Difficult.query.filter_by(seq=value["seq"]).first()
        if difficult is None:
            return {"error": "글을 찾을 수 없습니다."}, 404
        if value["password"] != difficult.password:
            return {"error": "비밀번호가 일치하지 않습니다."}, 403

        db.session.delete(difficult)
        db.session.commit()

        return {"result": "성공적으로 삭제되었습니다"}, 200



