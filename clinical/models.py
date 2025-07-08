from django.db import models
from users.models import PatientProfile, DoctorProfile

# Create your models here.
class Diagnosis(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=255)
    description = models.TextField()

class MedicalRecord(models.Model):
    patient = models.ForeignKey(PatientProfile,on_delete=models.SET_NULL, null=True)
    doctor = models.ForeignKey(DoctorProfile,on_delete=models.SET_NULL, null=True)
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Prescription(models.Model):
    medical_record = models.ForeignKey(MedicalRecord, on_delete=models.CASCADE)
    medication_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=255)
    duration = models.CharField(max_length=20)
                

