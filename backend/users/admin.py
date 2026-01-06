from django.contrib import admin

from users.models import CustomUser, DoctorProfile, PatientProfile

# Register your models here.

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['id','first_name','last_name','username','email','is_doctor','is_patient']


@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display =  ['id','user_id','age','gender','phone']

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ['id','user_id','specialization','bio','available_days']

    def available_days(self, obj):
        return ", ".join(day.name for day in obj.available_days.all())
    
    # get_available_days.short_description = 'Available Days'


