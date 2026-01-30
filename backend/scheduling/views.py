from requests import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend

from scheduling.filters import AppointmentFilter
from scheduling.models import Appointment
from scheduling.serializers import AppointmentSerializer, CreateAppointmentSerializer, UpdateAppointmentSerializer
from config.pagination import StandardResultsSetPagination


# Create your views here.

class AppointmentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends=[DjangoFilterBackend]
    filterset_class = AppointmentFilter
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_doctor:
            return Appointment.objects.filter(doctor__user=user)
        elif user.is_patient:
            return Appointment.objects.filter(patient__user=user)
        return Appointment.objects.none()
    
    

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateAppointmentSerializer
        elif self.request.method in ['PATCH','PUT']:
            return UpdateAppointmentSerializer
        return AppointmentSerializer
    
