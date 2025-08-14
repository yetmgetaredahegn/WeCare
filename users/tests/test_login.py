import email
from http import client
from os import access
import stat
from urllib import response
from pytest import mark, fixture
from rest_framework.test import APIClient
from rest_framework import status

from users.models import CustomUser
from common_conftest.conftest import test_user



@mark.django_db
class TestLogin:
    def test_if_valid_login_returns_200(self, test_user):
        client = APIClient()
        user = test_user(is_doctor=True)

        response = client.post("/auth/jwt/create/", {
                        "email": user.email,
                        "password": "Test@123"
                    })

        assert response.status_code == status.HTTP_200_OK
        assert "access" in response.data
        assert "refresh" in response.data

    def test_if_wrong_password_returns_401(self,test_user):
        user = test_user(is_doctor=True)
        client = APIClient()

        response = client.post("/auth/jwt/create/", {
                        "email": user.email,
                        "password": "Test@122"
                    })

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_missing_fields_returns_400(self,test_user):
        user = test_user(is_doctor=True)
        client = APIClient()

        response = client.post("/auth/jwt/create/", {
                        "email": user.email,
                        # "password": "Test@123"
                    })

        assert response.status_code == status.HTTP_400_BAD_REQUEST
        




