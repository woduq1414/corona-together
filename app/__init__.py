from flask import Flask, Response
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

class MyResponse(Response):
    default_mimetype = 'application/xml'


# http://flask.pocoo.org/docs/0.10/patterns/appfactories/
def create_app(config_filename):
    app = Flask(__name__, static_url_path='', static_folder='../static', template_folder='../static')

    app.config.from_object(config_filename)
    # app.response_class = MyResponse

    from app.db import db

    db.init_app(app)

    # Blueprints
    from app.difficult.views import difficult_bp
    from app.cheer.views import cheer_bp
    from app.tag.views import tag_bp

    # limiter = Limiter(app, default_limits=["2/second"], key_func=get_remote_address)
    # limiter.limit("1/second")(difficult_bp)


    app.register_blueprint(difficult_bp, url_prefix='/api/difficult')
    app.register_blueprint(cheer_bp, url_prefix='/api/cheer')
    app.register_blueprint(tag_bp, url_prefix='/api/tag')

    CORS(app)
    return app
