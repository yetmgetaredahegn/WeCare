from django.shortcuts import render, HttpResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet,GenericViewSet
from rest_framework.mixins import RetrieveModelMixin,UpdateModelMixin
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django_filters.rest_framework import  DjangoFilterBackend

from users.filters import AvailableDoctors
from users.models import DoctorProfile, PatientProfile
from users.permissions import IsPatientPermission,IsDoctorPermission
from users.serializers import DoctorProfileSerializer, PatientProfileSerializer, UpdateDoctorProfileSerializer, UpdatePatientProfileSerializer
from config.pagination import StandardResultsSetPagination


 
class PatientProfileViewSet(ModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['GET','PUT','PATCH'], permission_classes=[IsPatientPermission])
    def profile(self,request):
        patient, created = PatientProfile.objects.get_or_create(
            user_id=request.user.id, 
            defaults={"age": 0, "gender": "", "phone": ""}
            )

        if request.method == 'GET':
            serializer = PatientProfileSerializer(patient)
            return Response(serializer.data)
        elif request.method in ['PUT','PATCH']:
            serializer = UpdatePatientProfileSerializer(
                patient,
                data=request.data,
                partial=request.method == 'PATCH'
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            status_code = 201 if created else 200
            return Response(serializer.data, status=status_code)



class DoctorProfileViewSet(ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = AvailableDoctors
    pagination_class = StandardResultsSetPagination
    # def get_permissions(self):
    #     if self.request.method == 'DELETE':
    #         return IsAdminUser
    #     return IsAuthenticated

    @action(detail=False, methods=['GET','PUT','PATCH'], permission_classes=[IsDoctorPermission])
    def profile(self,request):
        doctor, created = DoctorProfile.objects.get_or_create(
                user_id=request.user.id, 
                defaults={"specialization": "", "bio": ""}
                )  

        if created:
            doctor.available_days.set([])  

        if request.method == 'GET':
            serializer = DoctorProfileSerializer(doctor)
            return Response(serializer.data)
        elif request.method in ['PUT','PATCH']:
            serializer = UpdateDoctorProfileSerializer(
                doctor,
                data=request.data,
                partial=request.method == 'PATCH'
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            status_code = 201 if created else 200
            return Response(serializer.data, status=status_code)  


    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def list_of_doctors(self,request):
        filtered_qs = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(filtered_qs)
        if page is not None:
            serializer = DoctorProfileSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = DoctorProfileSerializer(filtered_qs, many=True)
        return Response(serializer.data)
     
