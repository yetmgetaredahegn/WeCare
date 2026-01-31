import email
from http import client
from urllib import response
from rest_framework import status
from pytest import mark
from common_conftest.conftest import authenticate_client,test_user,api_client

@mark.django_db
class TestPatientProfileAccess:
    def test_if_patient_view_own_profile_returns_200(self,authenticate_client):
        client = authenticate_client(is_patient=True)

        response = client.get("/users/patient/profile/")

        assert response.status_code == status.HTTP_200_OK

    
    def test_if_patient_view_another_profile_returns_403(self,authenticate_client,test_user):
        client = authenticate_client(is_patient=True)
        another_user = test_user(is_patient=True,email="another@domain.com",first_name="another")

        response = client.get(f"/users/patient/{another_user.patientprofile.id}/")

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_doctor_tries_to_access_profile_returns_403(self,authenticate_client,test_user):
        client  = authenticate_client(is_doctor=True)
        patient = test_user(is_patient=True,email="patient@domain.com")

        response = client.get(f"/users/patient/{patient.patientprofile.id}/")

        assert response.status_code == status.HTTP_403_FORBIDDEN
