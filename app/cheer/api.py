from app.db import *
from flask_restful import Resource, reqparse
import bcrypt
from flask import request
import jwt
from config import SECRET_KEY
from datetime import datetime
from datetime import timedelta


# server.py

class _Cheer(Resource):

    def get(self):
        tagName = request.args.get("tagName", "")
        print(request.args)
        # tagName = "학생"
        tag = Tag.query.filter_by(tagName=tagName).first()
        if tag is None:
            return {"error": "태그를 찾을 수 없습니다."}, 404
        tagSeq = tag.seq

        cheer_list = Cheer.query.filter_by(tagSeq=tagSeq).order_by(Cheer.seq.desc()).limit(100)

        return [{
            "seq": cheer.seq,
            "content": cheer.content,
            "color" : cheer.color,
            "password": True if cheer.password is not None else False
        } for cheer in cheer_list], 200

    def post(self):
        print(request.json)
        value = request.json
        colors = ["#85f07b", "#f9a5f5", "#a9f6f4", "#f1f29a", "#8aeec3"]
        errors = []

        if not 0 < len(value["content"]):
            errors.append("내용이 비어있습니다.")
        if len(value["content"]) > 2000:
            errors.append("내용은 2000자까지 가능합니다.")
        if value["color"] not in colors:
            errors.append("색상을 선택해주세요.")


        print(errors)

        if len(errors) == 0:

            tag = Tag.query.filter_by(tagName=value["tagName"]).first()

            row = Cheer(content=value["content"],
                        color=value["color"],
                        tagSeq=tag.seq,
                        date=datetime.now(),
                        ip=request.headers['X-Forwarded-For'] if 'X-Forwarded-For' in request.headers else request.remote_addr,
                        password=value.get("password", None)
                        )

            db.session.add(row)
            db.session.commit()

            return {
                       "result": "success"
                   }, 201

        else:
            return {"error": errors}, 400










class _DeleteCheer(Resource):



    def post(self):
        print(request.json)
        value = request.json

        cheer = Cheer.query.filter_by(seq=value["seq"]).first()
        if cheer is None:
            return {"error": "글을 찾을 수 없습니다."}, 404
        if value["password"] != cheer.password:
            return {"error": "비밀번호가 일치하지 않습니다."}, 403

        db.session.delete(cheer)
        db.session.commit()

        return {"result": "성공적으로 삭제되었습니다"}, 200
