from .common import *

SECRET_KEY = os.getenv("SECRET_KEY", "test-secret-key")
DEBUG = False
ALLOWED_HOSTS = ["*"]

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE", "django.db.backends.postgresql"),
        "NAME": os.getenv("DB_NAME", "testdb"),
        "USER": os.getenv("DB_USER", "testuser"),
        "PASSWORD": os.getenv("DB_PASSWORD", "testpass"),
        "HOST": os.getenv("DB_HOST", "localhost"),
        "PORT": os.getenv("DB_PORT", "5432"),
    }
}
