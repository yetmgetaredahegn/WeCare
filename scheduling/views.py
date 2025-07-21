from logging import raiseExceptions
from multiprocessing import context
from urllib import request
from django.shortcuts import render
from requests import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


from scheduling.models import Appointment
from scheduling.serializers import AppointmentSerializer, CreateAppointmentSerializer


# Create your views here.

class AppointmentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateAppointmentSerializer
        return AppointmentSerializer
    def get_queryset(self):
        user = self.request.user
        if user.is_doctor:
            return Appointment.objects.filter(doctor__user=user)
        elif user.is_patient:
            return Appointment.objects.filter(patient__user=user)
        return Appointment.objects.none()
    
    
 
