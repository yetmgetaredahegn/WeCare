from pytest import mark
from rest_framework import status

from common_conftest.conftest import api_client


@mark.django_db
class TestDiagnosesList:
    def test_if_doctor_lists_diagnoses_returns_200(self,api_client,doctor_user,diagnosis):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.get("/clinical/diagnoses/")

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) >= 1

    def test_if_patient_lists_diagnoses_returns_403(self,api_client,patient_user):
        api_client.force_authenticate(user=patient_user)

        response = api_client.get("/clinical/diagnoses/")

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_unauthenticated_list_returns_401(self,api_client):
        response = api_client.get("/clinical/diagnoses/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@mark.django_db
class TestDiagnosesRetrieve:
    def test_if_doctor_retrieves_diagnosis_returns_200(self,api_client,doctor_user,diagnosis):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.get(f"/clinical/diagnoses/{diagnosis.id}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == diagnosis.id

    def test_if_doctor_retrieves_invalid_diagnosis_returns_404(self,api_client,doctor_user):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.get("/clinical/diagnoses/999999/")

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_if_patient_retrieves_diagnosis_returns_403(self,api_client,patient_user,diagnosis):
        api_client.force_authenticate(user=patient_user)

        response = api_client.get(f"/clinical/diagnoses/{diagnosis.id}/")

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_unauthenticated_retrieve_returns_401(self,api_client,diagnosis):
        response = api_client.get(f"/clinical/diagnoses/{diagnosis.id}/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
