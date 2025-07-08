from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from users.models import PatientProfile
from users.permissions import IsPatientPermission
from users.serializers import PatientProfileSerializer


 
class PatientProfileViewSet(ModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [IsPatientPermission]