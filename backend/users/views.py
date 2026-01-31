from django.shortcuts import render, HttpResponse
from rest_framework.decorators import action
from drf_spectacular.utils import extend_schema, extend_schema_view
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


 
@extend_schema_view(
    list=extend_schema(summary='List patient profiles', tags=['Users']),
    retrieve=extend_schema(summary='Retrieve a patient profile', tags=['Users']),
    create=extend_schema(summary='Create a patient profile', tags=['Users']),
    update=extend_schema(summary='Update a patient profile', tags=['Users']),
    partial_update=extend_schema(summary='Partially update a patient profile', tags=['Users']),
    destroy=extend_schema(summary='Delete a patient profile', tags=['Users']),
)
class PatientProfileViewSet(ModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [IsAdminUser]

    @extend_schema(summary='Get or update patient profile', tags=['Users'])
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



@extend_schema_view(
    list=extend_schema(summary='List doctor profiles', tags=['Users']),
    retrieve=extend_schema(summary='Retrieve a doctor profile', tags=['Users']),
    create=extend_schema(summary='Create a doctor profile', tags=['Users']),
    update=extend_schema(summary='Update a doctor profile', tags=['Users']),
    partial_update=extend_schema(summary='Partially update a doctor profile', tags=['Users']),
    destroy=extend_schema(summary='Delete a doctor profile', tags=['Users']),
)
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

    @extend_schema(summary='Get or update doctor profile', tags=['Users'])
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


    @extend_schema(summary='List available doctors', tags=['Users'])
    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def list_of_doctors(self,request):
        filtered_qs = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(filtered_qs)
        if page is not None:
            serializer = DoctorProfileSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = DoctorProfileSerializer(filtered_qs, many=True)
        return Response(serializer.data)
     
