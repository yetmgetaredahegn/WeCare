from config.settings.dev import SECRET_KEY
from .common import *
from decouple import config
import dj_database_url
import os


ALLOWED_HOSTS = ['wecare-yxpk.onrender.com']

DEBUG = False


SECRET_KEY = os.environ['SECRET_KEY']

DATABASES = {
    "default": dj_database_url.config(
        default=os.getenv("DATABASE_URL"),
        conn_max_age=600,
        ssl_require=True,   
    )
}


