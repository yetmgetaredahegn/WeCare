# from users.models import CustomUser
# from rest_framework.test import APIClient
# from rest_framework import status
# from pytest import fixture, mark

# @fixture
# def doctor_user(db):
#     return CustomUser.objects.create_user(username='doctest',password='ILoveBackend',is_doctor=True)

# @fixture
# def patient_user(db):
#     return CustomUser.objects.create_user(username='pattest', password='ILoveBackend',is_patient=True)


# @mark.django_db
# class TestDoctorsProhibitedPermissions:
#     def test_if_user_is_anonymous_returns_401(self):
#         client = APIClient()

#         response = client.get('/users/doctor/')

#         assert response.status_code == status.HTTP_401_UNAUTHORIZED

#     def test_if_doctor_tries_to_access_patientprofile_returns_403(self,doctor_user):
#         client = APIClient()
#         client.force_authenticate(user=doctor_user)
#         response = client.get('/users/patient/')
#         assert response.status_code == status.HTTP_403_FORBIDDEN

#     def test_if_doctor_books_appointment_returns_400(self,doctor_user):
#         client = APIClient()
#         client.force_authenticate(user=doctor_user)
        
#         response = client.post('/scheduling/appointments/', {
#             "doctor_id": 999,
#             "schedule_date": "2025-08-27",
#             "schedule_time": "2025-08-13T08:30:00Z"
#         })

#         assert response.status_code == status.HTTP_400_BAD_REQUEST
