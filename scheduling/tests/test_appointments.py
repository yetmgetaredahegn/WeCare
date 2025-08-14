import email
from pytest import mark
from rest_framework import status
from rest_framework.test import APIClient
from common_conftest.conftest import authenticate_client,api_client,test_user
from datetime import time,date

@mark.django_db
class TestAppointmentBooking:
    def test_if_patient_books_appointment_returns_201(self,test_user,api_client):
        patient = test_user(is_patient=True)
        doctor_user = test_user(is_doctor=True, email="doctor@test.com")
        doctor_profile = doctor_user.doctorprofile # assuming related_name='doctorprofile'


        api_client.force_authenticate(user=patient)

        response = api_client.post("/scheduling/appointments/", {
            "doctor_id": doctor_profile.id,
            "schedule_date": "2025-09-27",
            "schedule_time": "12:30:00"
        })

        assert response.status_code == status.HTTP_201_CREATED

