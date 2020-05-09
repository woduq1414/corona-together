# DATABASE SETTINGS
import configparser
import socket
import os

hostname = socket.gethostname()
isLocal = True
if hostname[:7] == "DESKTOP":
    isLocal = True
else:
    isLocal = False

if isLocal:
    config = configparser.ConfigParser()
    config.read('config.ini')

    pg_db_username = config['DEFAULT']['LOCAL_DB_USERNAME']
    pg_db_password = config['DEFAULT']['LOCAL_DB_PASSWORD']
    pg_db_name = config['DEFAULT']['LOCAL_DB_NAME']
    pg_db_hostname = config['DEFAULT']['LOCAL_DB_HOSTNAME']

    SQLALCHEMY_DATABASE_URI = "postgresql://{DB_USER}:{DB_PASS}@{DB_ADDR}/{DB_NAME}".format(DB_USER=pg_db_username,
                                                                                            DB_PASS=pg_db_password,
                                                                                            DB_ADDR=pg_db_hostname,
                                                                                            DB_NAME=pg_db_name)

    DEBUG = True
    PORT = 5000
    HOST = "127.0.0.1"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = config['DEFAULT']['SECRET_KEY']

else:
    pg_db_username = 'yeah'
    pg_db_password = 'yeah'
    pg_db_name = 'yeah'
    pg_db_hostname = 'yeah'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', None)

    DEBUG = False
    PORT = 5000
    HOST = "127.0.0.1"
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = os.environ.get('SECRET_KEY', None)

# PostgreSQL
