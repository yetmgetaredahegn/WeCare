from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import CreateModelMixin,RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet

from clinical.models import Diagnosis
from clinical.serializers import DiagnosisSerializer
from users.permissions import IsDoctorPermission
# Create your views here.

class DiagnosesViewSet(CreateModelMixin,RetrieveModelMixin, GenericViewSet):
    queryset = Diagnosis.objects.all()
    serializer_class = DiagnosisSerializer
    permission_classes = [IsDoctorPermission]


    

    

# class MedicalRecords(CreateModelMixin,RetrieveModelMixin):
