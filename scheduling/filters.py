import django_filters 

from scheduling.models import Appointment

class AppointmentFilter(django_filters.FilterSet):
    doctor = django_filters.CharFilter(field_name='doctor__id', lookup_expr='iexact')

    class Meta:
        model=Appointment
        fields = ['doctor']
