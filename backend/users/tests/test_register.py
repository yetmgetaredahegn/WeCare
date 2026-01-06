from http import client
from urllib import response
from pytest import mark
from rest_framework.test import APIClient
from rest_framework import status

from users.models import CustomUser

@mark.django_db
class TestRegister:
    def test_register_as_doctor_returns_201(self):
        client = APIClient()

        response = client.post("/auth/users/", {
                        "first_name": "firstest",
                        "last_name": "lasttest",
                        "email": "test@domain.com",
                        "username": "testuser",
                        "password": "Test@123",
                        "is_doctor": True,
                        "is_patient": False,
                        "re_password": "Test@123"
                    })
        
        assert response.status_code == status.HTTP_201_CREATED
    

    def test_register_as_patient_returns_201(self):
        client = APIClient()

        response = client.post("/auth/users/", {
                        "first_name": "firstest",
                        "last_name": "lasttest",
                        "email": "test@domain.com",
                        "username": "testuser",
                        "password": "Test@123",
                        "is_doctor": False,
                        "is_patient": True,
                        "re_password": "Test@123"
                    })

        assert response.status_code == status.HTTP_201_CREATED


    def test_required_fields_missing_returns_400(self):
        client = APIClient()

        response = client.post("/auth/users/", {
                        # "first_name": "firstest",
                        "last_name": "lasttest",
                        "email": "test@domain.com",
                        "password": "Test@123",
                        "is_doctor": False,
                        "is_patient": True,
                        "re_password": "Test@123"
                    })
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_duplicate_email_returns_400(self):
        
        client = APIClient()

        client.post("/auth/users/", {
                        "first_name": "firstest",
                        "last_name": "lasttest",
                        "email": "duplicate@check.com",
                        "password": "Test@123",
                        "is_doctor": False,
                        "is_patient": True,
                        "re_password": "Test@123"
                    })

        response = client.post("/auth/users/", {
                        "first_name": "duplicatetest",
                        "last_name": "lasttest",
                        "email": "duplicate@check.com",
                        "password": "Test@123",
                        "is_doctor": False,
                        "is_patient": True,
                        "re_password": "Test@123"
                    })
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST


