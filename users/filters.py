import django_filters 

from users.models import DoctorProfile

class AvailableDoctors(django_filters.FilterSet):
    available_days = django_filters.CharFilter(field_name='available_days__name', lookup_expr='iexact')

    class Meta:
        model = DoctorProfile
        fields = ['available_days']
