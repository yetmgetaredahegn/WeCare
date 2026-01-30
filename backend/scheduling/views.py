from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Max

from scheduling.filters import AppointmentFilter
from scheduling.models import Appointment
from scheduling.serializers import AppointmentSerializer, CreateAppointmentSerializer, UpdateAppointmentSerializer
from config.pagination import StandardResultsSetPagination
from users.permissions import IsDoctorPermission
from users.models import PatientProfile
from users.serializers import DoctorPatientSummarySerializer


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

    @action(
        detail=False,
        methods=['get'],
        url_path='patients',
        permission_classes=[IsAuthenticated, IsDoctorPermission],
    )
    def patients(self, request):
        order = request.query_params.get('order', 'alpha')
        base_queryset = PatientProfile.objects.filter(
            appointment__doctor__user=request.user
        ).distinct()

        if order == 'recent':
            base_queryset = base_queryset.annotate(
                last_appointment=Max('appointment__schedule_date')
            ).order_by('-last_appointment', 'full_name')
        else:
            base_queryset = base_queryset.order_by('full_name')

        serializer = DoctorPatientSummarySerializer(base_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
