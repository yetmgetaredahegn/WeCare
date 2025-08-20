from config.settings.dev import SECRET_KEY
from .common import *
import os
import dj_database_url


ALLOWED_HOSTS = ['wecare-yxpk.onrender.com']

DEBUG = False


SECRET_KEY = os.environ['SECRET_KEY']

DATABASES = {
    'default': dj_database_url.config('DATABASE_URL')
}

