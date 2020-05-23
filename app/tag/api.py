from app.db import *
from flask_restful import Resource, reqparse
import bcrypt
from flask import request
import jwt
from config import SECRET_KEY
from datetime import datetime
from datetime import timedelta



# server.py

class GetTag(Resource):

    def get(self):
        print(Tag.query.filter_by(disabled=0).all())
        data = [tag.tagName for tag in Tag.query.filter_by(disabled=0).all()]

        return data



