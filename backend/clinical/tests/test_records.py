from pytest import mark
from rest_framework import status

from clinical.models import MedicalRecord
from common_conftest.conftest import api_client, authenticate_client


@mark.django_db
class TestMedicalRecordList:
    def test_if_doctor_lists_all_records_returns_200(self,api_client,doctor_user,patient_user,patient_user_two,diagnosis):
        MedicalRecord.objects.create(
            patient=patient_user.patientprofile,
            doctor=doctor_user.doctorprofile,
            diagnosis=diagnosis,
        )
        MedicalRecord.objects.create(
            patient=patient_user_two.patientprofile,
            doctor=doctor_user.doctorprofile,
            diagnosis=diagnosis,
        )

        api_client.force_authenticate(user=doctor_user)

        response = api_client.get("/clinical/medical_records/")

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2

    def test_if_patient_lists_own_records_returns_200(self,api_client,doctor_user,patient_user,patient_user_two,diagnosis):
        MedicalRecord.objects.create(
            patient=patient_user.patientprofile,
            doctor=doctor_user.doctorprofile,
            diagnosis=diagnosis,
        )
        MedicalRecord.objects.create(
            patient=patient_user_two.patientprofile,
            doctor=doctor_user.doctorprofile,
            diagnosis=diagnosis,
        )

        api_client.force_authenticate(user=patient_user)

        response = api_client.get("/clinical/medical_records/")

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]["patient"] == patient_user.patientprofile.id

    def test_if_unauthenticated_list_returns_401(self,api_client):
        response = api_client.get("/clinical/medical_records/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@mark.django_db
class TestMedicalRecordRetrieve:
    def test_if_doctor_retrieves_record_returns_200(self,api_client,doctor_user,medical_record):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.get(f"/clinical/medical_records/{medical_record.id}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["id"] == medical_record.id

    def test_if_patient_retrieves_own_record_returns_200(self,api_client,patient_user,medical_record):
        api_client.force_authenticate(user=patient_user)

        response = api_client.get(f"/clinical/medical_records/{medical_record.id}/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data["patient"] == patient_user.patientprofile.id

    def test_if_patient_retrieves_other_record_returns_404(self,api_client,patient_user_two,medical_record):
        api_client.force_authenticate(user=patient_user_two)

        response = api_client.get(f"/clinical/medical_records/{medical_record.id}/")

        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_if_unauthenticated_retrieve_returns_401(self,api_client,medical_record):
        response = api_client.get(f"/clinical/medical_records/{medical_record.id}/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@mark.django_db
class TestMedicalRecordCreate:
    def test_if_doctor_creates_record_returns_201(self,api_client,doctor_user,patient_user,diagnosis):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.post("/clinical/medical_records/", {
            "patient": patient_user.patientprofile.id,
            "diagnosis": diagnosis.id,
        })

        assert response.status_code == status.HTTP_201_CREATED
        assert response.data["patient"] == patient_user.patientprofile.id
        assert response.data["diagnosis"] == diagnosis.id

    def test_if_patient_creates_record_returns_403(self,api_client,patient_user,diagnosis):
        api_client.force_authenticate(user=patient_user)

        response = api_client.post("/clinical/medical_records/", {
            "patient": patient_user.patientprofile.id,
            "diagnosis": diagnosis.id,
        })

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_missing_fields_returns_400(self,api_client,doctor_user,patient_user):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.post("/clinical/medical_records/", {
            "patient": patient_user.patientprofile.id,
        })

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_unauthenticated_create_returns_401(self,api_client,patient_user,diagnosis):
        response = api_client.post("/clinical/medical_records/", {
            "patient": patient_user.patientprofile.id,
            "diagnosis": diagnosis.id,
        })

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
