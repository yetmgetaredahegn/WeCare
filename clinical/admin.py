from django.contrib import admin

from clinical.models import Diagnosis

# Register your models here.
@admin.register(Diagnosis)
class DiagnosisModelAdmine(admin.ModelAdmin):
    list_display = ['id']