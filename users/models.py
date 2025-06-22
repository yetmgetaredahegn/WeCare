from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_patient = models.BooleanField()
    is_doctor = models.BooleanField()

class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=255)
    bio = models.TextField()
    available_days = models.CharField()
    

class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    gender = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)

