import django_filters 

from scheduling.models import Appointment

class AppointmentFilter(django_filters.FilterSet):
    doctor = django_filters.CharFilter(field_name='doctor__id', lookup_expr='iexact')
    schedule_date = django_filters.DateFilter(field_name='schedule_date', lookup_expr='exact')
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')

    class Meta:
        model=Appointment
        fields = ['doctor', 'schedule_date', 'status']
