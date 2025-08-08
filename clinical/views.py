from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import CreateModelMixin,RetrieveModelMixin,ListModelMixin
from rest_framework.viewsets import GenericViewSet

from clinical.models import Diagnosis, Prescription, MedicalRecord
from clinical.serializers import CreateMedicalRecordsSerializer, DiagnosisSerializer, MedicalRecordsSerializer, PrescriptionSerializer
from users.permissions import IsDoctorPermission
# Create your views here.

class DiagnosesViewSet(CreateModelMixin,RetrieveModelMixin, ListModelMixin,GenericViewSet):
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer
    permission_classes = [IsDoctorPermission]
    

class MedicalRecordViewSet(CreateModelMixin,ListModelMixin,RetrieveModelMixin,GenericViewSet):
    # queryset = MedicalRecord.objects.all()
    def get_queryset(self):
        user = self.request.user
        if user.is_patient:
            return MedicalRecord.objects.filter(patient__user=user)
        
   
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
    

class PrescriptionViewSet(CreateModelMixin,ListModelMixin,GenericViewSet):
    queryset = Prescription.objects.all()
    serializer_class = PrescriptionSerializer
    # permission_classes = [IsDoctorPermission]
