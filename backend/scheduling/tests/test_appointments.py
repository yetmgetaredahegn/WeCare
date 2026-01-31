from datetime import date, timedelta

from pytest import mark
from rest_framework import status

from common_conftest.conftest import authenticate_client, api_client, test_user

@mark.django_db
class TestAppointmentBooking:
    def test_if_patient_books_appointment_returns_201(self,test_user,authenticate_client):
        patient = authenticate_client(is_patient=True)
        doctor_user = test_user(is_doctor=True, email="doctor@test.com")
        doctor_profile = doctor_user.doctorprofile 

        response = patient.post("/scheduling/appointments/", {
            "doctor_id": doctor_profile.id,
            "schedule_date": (date.today() + timedelta(days=1)).isoformat(),
            "schedule_time": "12:30:00"
        })

        assert response.status_code == status.HTTP_201_CREATED


    def test_if_doctor_tries_to_book_returns_400(self,authenticate_client,test_user):
        doc_test_user = test_user(is_doctor=True, email="doctest@wecare.com")
        doctor_profile = doc_test_user.doctorprofile
        doctor = authenticate_client(is_doctor=True)

        response = doctor.post("/scheduling/appointments/", {
                        "doctor_id": doctor_profile.id,
                        "schedule_date": (date.today() + timedelta(days=1)).isoformat(),
                        "schedule_time": "12:30:00"
                    })
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_invalid_doctor_id_returns_400(self,authenticate_client,test_user):
        patient = authenticate_client(is_patient=True)
        doctor_user = test_user(is_doctor=True, email="doctor@test.com")
        doctor_profile = doctor_user.doctorprofile

        response = patient.post("/scheduling/appointments/", {
            "doctor_id": 999,  # non-existent doctor
            "schedule_date": (date.today() + timedelta(days=1)).isoformat(),
            "schedule_time": "12:30:00"
        })

        assert response.status_code == 400
        assert "doctor_id" in response.data

    def test_if_unauthenticated_booking_returns_401(self,api_client,test_user):
        doctor_user = test_user(is_doctor=True, email="doctor@test.com")
        doctor_profile = doctor_user.doctorprofile

        response = api_client.post("/scheduling/appointments/", {
            "doctor_id": doctor_profile.id,
            "schedule_date": (date.today() + timedelta(days=1)).isoformat(),
            "schedule_time": "12:30:00"
        })

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@mark.django_db
class TestAppointmentListing:
    def test_if_patient_views_own_appointments_returns_200(self,api_client,patient_user,appointment,appointment_other_patient):
        api_client.force_authenticate(user=patient_user)

        response = api_client.get("/scheduling/appointments/")

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data["results"]) == 1
        assert response.data["results"][0]["patient_id"] == patient_user.patientprofile.id

    def test_if_doctor_views_their_appointments_returns_200(self,api_client,doctor_user,appointment,appointment_other_doctor):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.get("/scheduling/appointments/")

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data["results"]) == 1
        assert response.data["results"][0]["doctor_id"] == doctor_user.doctorprofile.id

    def test_if_unauthenticated_user_views_appointments_returns_401(self,api_client):
        response = api_client.get("/scheduling/appointments/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_user_views_another_users_appointment_returns_404(self,api_client,patient_user_two,appointment):
        api_client.force_authenticate(user=patient_user_two)

        response = api_client.get(f"/scheduling/appointments/{appointment.id}/")

        assert response.status_code == status.HTTP_404_NOT_FOUND


@mark.django_db
class TestAppointmentUpdate:
    def test_if_doctor_confirms_appointment_returns_200(self,api_client,doctor_user,appointment):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.patch(f"/scheduling/appointments/{appointment.id}/", {"status": "C"})

        assert response.status_code == status.HTTP_200_OK
        assert response.data["status"] == "C"

    def test_if_patient_cancels_appointment_returns_200(self,api_client,patient_user,appointment):
        api_client.force_authenticate(user=patient_user)

        response = api_client.patch(f"/scheduling/appointments/{appointment.id}/", {"status": "X"})

        assert response.status_code == status.HTTP_200_OK
        assert response.data["status"] == "X"

    def test_if_patient_updates_status_invalid_returns_400(self,api_client,patient_user,appointment):
        api_client.force_authenticate(user=patient_user)

        response = api_client.patch(f"/scheduling/appointments/{appointment.id}/", {"status": "C"})

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_doctor_updates_status_invalid_returns_400(self,api_client,doctor_user,appointment):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.patch(f"/scheduling/appointments/{appointment.id}/", {"status": "P"})

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_user_updates_other_appointment_returns_404(self,api_client,patient_user_two,appointment):
        api_client.force_authenticate(user=patient_user_two)

        response = api_client.patch(f"/scheduling/appointments/{appointment.id}/", {"status": "X"})

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_if_unauthenticated_update_returns_401(self,api_client,appointment):
        response = api_client.patch(f"/scheduling/appointments/{appointment.id}/", {"status": "X"})

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


# class TestAppointment


