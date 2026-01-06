from django.contrib import admin

from clinical.models import Diagnosis, MedicalRecord, Prescription

# Register your models here.
@admin.register(Diagnosis)
class DiagnosisModelAdmin(admin.ModelAdmin):
    list_display = ['id']


@admin.register(MedicalRecord)
class MedicalRecordModelAdmin(admin.ModelAdmin):
    list_display = ['id','patient','diagnosis']

@admin.register(Prescription)
class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ['id']