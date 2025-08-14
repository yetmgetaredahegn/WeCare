import pytest
from rest_framework.test import APIClient
from users.models import CustomUser

@pytest.fixture
def api_client(db):
    return APIClient()

@pytest.fixture
def test_user(db):
    def create_test_user(**kwargs):
        from users.models import PatientProfile, DoctorProfile
        
        defaults = {
            "first_name": "firstest",
            "last_name": "lasttest",
            "email": "test@domain.com",
            "password": "Test@123",
            "is_doctor": False,
            "is_patient": False
        }
        defaults.update(kwargs)
        user = CustomUser.objects.create_user(**defaults)

        if user.is_patient:
            PatientProfile.objects.create(user=user)
        elif user.is_doctor:
            DoctorProfile.objects.create(user=user)

        return user
    return create_test_user


@pytest.fixture
def authenticate_client(db, api_client, test_user):
    def do_authenticate_client(**kwargs):
        user = test_user(**kwargs)
        api_client.force_authenticate(user=user)
        return api_client
    return do_authenticate_client


