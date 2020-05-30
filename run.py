#!/usr/bin/env python
from app import create_app
from flask import render_template, request, redirect

# app = create_app('config')
# app.app_context().push()

from app.db import db
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = create_app('config')
# db.create_all(app=app)


@app.before_request
def force_https():
    import socket
    hostname = socket.gethostname()
    isLocal = True
    if hostname[:7] == "DESKTOP":
        isLocal = True
    else:
        isLocal = False
    if isLocal == False:
        if request.endpoint in app.view_functions and not request.is_secure:
            return redirect(request.url.replace('http://', 'https://'))




@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.close()

# routing > react_router (method = GET)
@app.route('/', defaults={'path': ''}, methods=['GET'])
# @app.route('/<string:path>', methods=['GET'])
def catch_all(path):

    return render_template('index.html')

# 404 not found > react_router
@app.errorhandler(404)
def not_found(error):
    print("SDF")


    return render_template('index.html')


# @app.route('/api/difficult', methods=['POST'])



if __name__ == '__main__':
    app.run(host=app.config['HOST'],
            port=app.config['PORT'],
            debug=app.config['DEBUG'])
