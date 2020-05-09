from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

db = SQLAlchemy()


class User(db.Model):
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    userSeq = db.Column(db.Integer, primary_key=True, nullable=False)
    id = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    nickname = db.Column(db.String(20), nullable=False)


class Difficult(db.Model):
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    seq = db.Column(db.Integer, primary_key=True, nullable=False)
    tag = db.Column(db.String(20), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    ip = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

class Cheer(db.Model):
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    seq = db.Column(db.Integer, primary_key=True, nullable=False)
    tag = db.Column(db.String(20), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    ip = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)


class Tag(db.Model):
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    seq = db.Column(db.Integer, primary_key=True, nullable=False)
    tagName = db.Column(db.String(20), nullable=False)