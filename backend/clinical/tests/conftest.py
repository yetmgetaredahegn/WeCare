import pytest

from clinical.models import Diagnosis, MedicalRecord, Prescription
from common_conftest.conftest import test_user


@pytest.fixture
def doctor_user(test_user):
    return test_user(is_doctor=True, email="doctor1@clinical.com")


@pytest.fixture
def patient_user(test_user):
    return test_user(is_patient=True, email="patient1@clinical.com")


@pytest.fixture
def patient_user_two(test_user):
    return test_user(is_patient=True, email="patient2@clinical.com")


@pytest.fixture
def diagnosis(db):
    diagnosis, _ = Diagnosis.objects.get_or_create(
        code="I10",
        defaults={
            "name": "Hypertension",
            "description": "High blood pressure",
        },
    )
    return diagnosis


@pytest.fixture
def medical_record(doctor_user, patient_user, diagnosis):
    return MedicalRecord.objects.create(
        patient=patient_user.patientprofile,
        doctor=doctor_user.doctorprofile,
        diagnosis=diagnosis,
    )


@pytest.fixture
def prescription(medical_record):
    return Prescription.objects.create(
        medical_record=medical_record,
        medication_name="Amoxicillin",
        dosage="500mg",
        duration="7 days",
    )
