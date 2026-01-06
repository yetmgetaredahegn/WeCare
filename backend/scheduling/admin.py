from django.contrib import admin

from scheduling.models import Appointment

# Register your models here.


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id']
