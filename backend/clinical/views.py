from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import CreateModelMixin,RetrieveModelMixin,ListModelMixin
from rest_framework.viewsets import GenericViewSet
from drf_spectacular.utils import extend_schema, extend_schema_view

from clinical.models import Diagnosis, Prescription, MedicalRecord
from clinical.serializers import CreateMedicalRecordsSerializer, DiagnosisSerializer, MedicalRecordsSerializer, PrescriptionSerializer
from users import permissions
from users.permissions import IsDoctorPermission
# Create your views here.

@extend_schema_view(
    list=extend_schema(summary='List diagnoses', tags=['Clinical']),
    retrieve=extend_schema(summary='Retrieve a diagnosis', tags=['Clinical']),
)
class DiagnosesViewSet(RetrieveModelMixin, ListModelMixin,GenericViewSet):
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer
    permission_classes = [IsDoctorPermission]
    

@extend_schema_view(
    list=extend_schema(summary='List medical records', tags=['Clinical']),
    retrieve=extend_schema(summary='Retrieve a medical record', tags=['Clinical']),
    create=extend_schema(summary='Create a medical record', tags=['Clinical']),
)
class MedicalRecordViewSet(CreateModelMixin,ListModelMixin,RetrieveModelMixin,GenericViewSet):
    # queryset = MedicalRecord.objects.all()
    def get_queryset(self):
        user = self.request.user
        if user.is_doctor:
            return MedicalRecord.objects.all()
        elif user.is_patient:
            return MedicalRecord.objects.filter(patient__user=user)
        return MedicalRecord.objects.none()
        
   
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateMedicalRecordsSerializer
        return MedicalRecordsSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [IsAuthenticated, IsDoctorPermission]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

@extend_schema_view(
    list=extend_schema(summary='List prescriptions', tags=['Clinical']),
    create=extend_schema(summary='Create a prescription', tags=['Clinical']),
)
class PrescriptionViewSet(CreateModelMixin,ListModelMixin,GenericViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    permission_classes = [IsDoctorPermission]

    def get_queryset(self):
        medical_record_id = self.kwargs['medical_record_pk']
        return Prescription.objects.filter(medical_record_id=medical_record_id)
    
    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [IsAuthenticated,IsDoctorPermission]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
