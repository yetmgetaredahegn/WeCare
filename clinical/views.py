from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import CreateModelMixin,RetrieveModelMixin,ListModelMixin
from rest_framework.viewsets import GenericViewSet

from clinical.models import Diagnosis, MedicalRecord
from clinical.serializers import CreateMedicalRecordsSerializer, DiagnosisSerializer, MedicalRecordsSerializer
from users.permissions import IsDoctorPermission
# Create your views here.

class DiagnosesViewSet(CreateModelMixin,RetrieveModelMixin, ListModelMixin,GenericViewSet):
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer
    permission_classes = [IsDoctorPermission]
    

class MedicalRecords(CreateModelMixin,ListModelMixin,RetrieveModelMixin,GenericViewSet):
    queryset = MedicalRecord.objects.all()
    # def get_queryset(self):
    #     user = self.request.user
    #     if user.is_patient:
    #         MedicalRecord.objects.filter(patient__user=user)
    #     elif user.is_doctor:
    #         MedicalRecord.object.filter(doctot__user=user)
   
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateMedicalRecordsSerializer
        return MedicalRecordsSerializer