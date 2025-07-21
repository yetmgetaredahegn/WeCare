from django.db import models
from users.models import DoctorProfile, PatientProfile

# Create your models here.
class Appointment(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.SET_NULL, null=True)
    doctor = models.ForeignKey(DoctorProfile, on_delete=models.SET_NULL, null=True)
    schedule_date = models.DateField()
    schedule_time = models.TimeField()
    STATUS = [
       ('P', 'Pending'),
       ('C', 'Confirmed'),
       ('X','Cancelled')
    ]
    status = models.CharField(max_length=1, choices=STATUS, default='P')
