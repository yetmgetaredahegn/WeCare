import email
from urllib import response
from pytest import mark
from rest_framework import status
from rest_framework.test import APIClient
from common_conftest.conftest import authenticate_client,api_client,test_user
from datetime import time,date

@mark.django_db
class TestAppointmentBooking:
    def test_if_patient_books_appointment_returns_201(self,test_user,authenticate_client):
        patient = authenticate_client(is_patient=True)
        doctor_user = test_user(is_doctor=True, email="doctor@test.com")
        doctor_profile = doctor_user.doctorprofile 

        response = patient.post("/scheduling/appointments/", {
            "doctor_id": doctor_profile.id,
            "schedule_date": "2025-09-27",
            "schedule_time": "12:30:00"
        })

        assert response.status_code == status.HTTP_201_CREATED


    def test_if_doctor_tries_to_book_returns_400(self,authenticate_client,test_user):
        doc_test_user = test_user(is_doctor=True, email="doctest@wecare.com")
        doctor_profile = doc_test_user.doctorprofile
        doctor = authenticate_client(is_doctor=True)

        response = doctor.post("/scheduling/appointments/", {
                        "doctor_id": doctor_profile.id,
                        "schedule_date": "2025-09-27",
                        "schedule_time": "12:30:00"
                    })
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_invalid_doctor_id_returns_400(self,authenticate_client,test_user):
        patient = authenticate_client(is_patient=True)
        doctor_user = test_user(is_doctor=True, email="doctor@test.com")
        doctor_profile = doctor_user.doctorprofile

        response = patient.post("/scheduling/appointments/", {
            "doctor_id": 999,  # non-existent doctor
            "schedule_date": "2025-09-27",
            "schedule_time": "12:30:00"
        })

        assert response.status_code == 400
        assert "doctor_id" in response.data


# class TestAppointment


