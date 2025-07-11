from django.contrib import admin

from users.models import CustomUser, DoctorProfile, PatientProfile

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id','first_name','last_name','username','email','is_doctor','is_patient']

# @admin.register(DoctorProfile)
# class DoctorProfileAdmin(admin.ModelAdmin):
#     list_display = ['id','user_id','specialization','bio','available_days']

@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display =  ['id','user_id','age','gender','phone']

