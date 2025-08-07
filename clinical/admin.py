from django.contrib import admin

from clinical.models import Diagnosis, MedicalRecord

# Register your models here.
@admin.register(Diagnosis)
class DiagnosisModelAdmine(admin.ModelAdmin):
    list_display = ['id']


@admin.register(MedicalRecord)
class MedicalRecordModelAdmine(admin.ModelAdmin):
    list_display = ['id','patient','diagnosis']