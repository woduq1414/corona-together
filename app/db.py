from flask_sqlalchemy import SQLAlchemy, Model
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import relationship, backref
from sqlalchemy import ForeignKey


class CustomModel(Model):
    def as_dict(self):
        temp = {}
        for x in self.__table__.columns:
            if str(type(getattr(self, x.name))) == "<class 'datetime.datetime'>":
                temp[x.name] = str(getattr(self, x.name))
            else:
                temp[x.name] = getattr(self, x.name)
        return temp


db = SQLAlchemy(model_class=CustomModel)


class Difficult(db.Model):
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    __tablename__ = "difficult"
    seq = db.Column(db.Integer, primary_key=True, nullable=False)
    tagSeq = db.Column(db.Integer, ForeignKey('tag.seq'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    ip = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    password = db.Column(db.String(20), nullable=True)
    tag = relationship("Tag", backref=backref('difficult', order_by=seq))


class Cheer(db.Model):
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    __tablename__ = "cheer"
    seq = db.Column(db.Integer, primary_key=True, nullable=False)
    tagSeq = db.Column(db.Integer, ForeignKey('tag.seq'), nullable=False)
    color = db.Column(db.String(10), nullable=False)
    content = db.Column(db.String(2000), nullable=False)
    ip = db.Column(db.String(20), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    password = db.Column(db.String(20), nullable=True)
    tag = relationship("Tag", backref=backref('cheer', order_by=seq))


class Tag(db.Model):
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}
    __tablename__ = "tag"
    seq = db.Column(db.Integer, primary_key=True, nullable=False)
    tagName = db.Column(db.String(20), nullable=False)
    disabled = db.Column(db.Integer, default=0, nullable=False)
