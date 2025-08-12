# from rest_framework import status
# from pytest import mark
# from conftest import authenticate_client

# @mark.django_db
# class TestPatientProfileAccess:
#     def test_if_patient_view_own_profile_returns_200(self,authenticate_client):
#         client = authenticate_client(is_patient=True)

#         response = client.get("/users/patient/profile")

#         assert response.status_code == status.HTTP_200_OK