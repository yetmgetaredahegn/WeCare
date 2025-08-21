from django.contrib.auth.models import AbstractUser
from django.db import models
from config.settings import common
from users.managers import CustomUserManager

class CustomUser(AbstractUser):
    date_joined = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    is_patient = models.BooleanField(default=False)
    is_doctor = models.BooleanField(default=False)
    objects = CustomUserManager()
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

class Day(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class DoctorProfile(models.Model):
    user = models.OneToOneField(common.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="doctorprofile")
    specialization = models.CharField(max_length=255,blank=True)
    bio = models.TextField(blank=True)
    available_days = models.ManyToManyField(Day)
    

class PatientProfile(models.Model):
    user = models.OneToOneField(common.AUTH_USER_MODEL, on_delete=models.CASCADE)
    age = models.IntegerField(null=True,blank=True)
    gender = models.CharField(max_length=255,blank=True)
    phone = models.CharField(max_length=15,blank=True)

    def __str__(self):
        return self.user.get_full_name()



