from django.contrib import admin

from users.models import CustomUser, DoctorProfile

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id','first_name','last_name','username','email','is_doctor','is_patient']

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ['id','first_name','last_name','username','email','is_doctor','is_patient']


