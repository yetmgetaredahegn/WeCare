import pytest
from datetime import date, time, timedelta

from scheduling.models import Appointment
from common_conftest.conftest import test_user


@pytest.fixture
def doctor_user(test_user):
    return test_user(is_doctor=True, email="doctor1@scheduling.com")


@pytest.fixture
def doctor_user_two(test_user):
    return test_user(is_doctor=True, email="doctor2@scheduling.com")


@pytest.fixture
def patient_user(test_user):
    return test_user(is_patient=True, email="patient1@scheduling.com")


@pytest.fixture
def patient_user_two(test_user):
    return test_user(is_patient=True, email="patient2@scheduling.com")


@pytest.fixture
def appointment(doctor_user, patient_user):
    return Appointment.objects.create(
        patient=patient_user.patientprofile,
        doctor=doctor_user.doctorprofile,
        schedule_date=date.today() + timedelta(days=1),
        schedule_time=time(12, 30),
    )


@pytest.fixture
def appointment_other_patient(doctor_user, patient_user_two):
    return Appointment.objects.create(
        patient=patient_user_two.patientprofile,
        doctor=doctor_user.doctorprofile,
        schedule_date=date.today() + timedelta(days=2),
        schedule_time=time(13, 30),
    )


@pytest.fixture
def appointment_other_doctor(doctor_user_two, patient_user):
    return Appointment.objects.create(
        patient=patient_user.patientprofile,
        doctor=doctor_user_two.doctorprofile,
        schedule_date=date.today() + timedelta(days=3),
        schedule_time=time(14, 30),
    )
