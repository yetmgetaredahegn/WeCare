from .common import *

DEBUG = True

SECRET_KEY = 'django-insecure-f6$_#%8t0$mdc++2j#&c58gryvz*$e-dp^cf17h%y=8kkgiw)h'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'wecare',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5433',
    }
}

