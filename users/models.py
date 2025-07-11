from django.contrib.auth.models import AbstractUser
from django.db import models
from config import settings

class CustomUser(AbstractUser):
    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)

    def __str__(self):
        return self.username

class Day(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class DoctorProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=255)
    bio = models.TextField()
    available_days = models.ManyToManyField(Day)
    

class PatientProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    age = models.IntegerField(null=True)
    gender = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)

