import email
from http import client
from conftest import authenticate_client,test_user
from rest_framework import status
from pytest import fixture, mark



@mark.django_db
class TestDoctorProfileAccess:
    def test_if_doctor_views_own_profile_returns(self,authenticate_client):
        client = authenticate_client(is_doctor=True)

        response = client.get("/users/doctor/profile/")

        assert response.status_code == status.HTTP_200_OK


    def test_if_patient_tries_to_access_returns_403(self,authenticate_client,test_user):
        client = authenticate_client(is_patient = True)
        doctor = test_user(is_doctor=True,email="doctor@domain.com")

        response = client.get(f"/users/doctor/{doctor.id}/")

        assert response.status_code == status.HTTP_403_FORBIDDEN

@mark.django_db
class TestListOfDoctors:
    def test_if_doctor_access_list_of_doctors_returns_200(self,authenticate_client):
        client = authenticate_client(is_doctor=True)

        response = client.get("/users/doctor/list_of_doctors/")

        assert response.status_code == status.HTTP_200_OK


    def test_if_patient_access_list_of_doctors_returns_200(self,authenticate_client):
        client = authenticate_client(is_patient=True)

        response = client.get("/users/doctor/list_of_doctors/")

        assert response.status_code == status.HTTP_200_OK
