from pytest import mark
from rest_framework import status

from clinical.models import Prescription
from common_conftest.conftest import api_client


@mark.django_db
class TestPrescriptionList:
    def test_if_authenticated_user_lists_prescriptions_returns_200(self,api_client,patient_user,prescription):
        api_client.force_authenticate(user=patient_user)

        response = api_client.get(f"/clinical/medical_records/{prescription.medical_record.id}/prescriptions/")

        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_if_unauthenticated_list_returns_401(self,api_client,prescription):
        response = api_client.get(f"/clinical/medical_records/{prescription.medical_record.id}/prescriptions/")

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_if_invalid_record_returns_empty_list(self,api_client,patient_user):
        api_client.force_authenticate(user=patient_user)

        response = api_client.get("/clinical/medical_records/999999/prescriptions/")

        assert response.status_code == status.HTTP_200_OK
        assert response.data == []


@mark.django_db
class TestPrescriptionCreate:
    def test_if_doctor_creates_prescription_returns_201(self,api_client,doctor_user,medical_record):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.post(
            f"/clinical/medical_records/{medical_record.id}/prescriptions/",
            {
                "medication_name": "Paracetamol",
                "dosage": "500mg",
                "duration": "5 days",
            },
        )

        assert response.status_code == status.HTTP_201_CREATED
        assert Prescription.objects.filter(medical_record=medical_record).count() == 1

    def test_if_patient_creates_prescription_returns_403(self,api_client,patient_user,medical_record):
        api_client.force_authenticate(user=patient_user)

        response = api_client.post(
            f"/clinical/medical_records/{medical_record.id}/prescriptions/",
            {
                "medication_name": "Paracetamol",
                "dosage": "500mg",
                "duration": "5 days",
            },
        )

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_if_missing_fields_returns_400(self,api_client,doctor_user,medical_record):
        api_client.force_authenticate(user=doctor_user)

        response = api_client.post(
            f"/clinical/medical_records/{medical_record.id}/prescriptions/",
            {
                "medication_name": "Paracetamol",
            },
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_if_unauthenticated_create_returns_401(self,api_client,medical_record):
        response = api_client.post(
            f"/clinical/medical_records/{medical_record.id}/prescriptions/",
            {
                "medication_name": "Paracetamol",
                "dosage": "500mg",
                "duration": "5 days",
            },
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED
