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
from users.serializers import DoctorProfileSerializer, PatientProfileSerializer


 
class PatientProfileViewSet(ModelViewSet):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['GET','PUT'], permission_classes=[IsPatientPermission])
    def profile(self,request):
        patient, created = PatientProfile.objects.get_or_create(
            user_id=request.user.id, 
            defaults={"age": 0, "gender": "", "phone": ""}
            )

        if request.method == 'GET':
            serializer = PatientProfileSerializer(patient)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = PatientProfileSerializer(patient,data=request.data)
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
    # def get_permissions(self):
    #     if self.request.method == 'DELETE':
    #         return IsAdminUser
    #     return IsAuthenticated

    @action(detail=False, methods=['GET','PUT'], permission_classes=[IsDoctorPermission])
    def profile(self,request):
        doctor, created = DoctorProfile.objects.get_or_create(
                user_id=request.user.id, 
                defaults={"specialization": "", "bio": "", "available_days": ""}
                )    

        if request.method == 'GET':
            serializer = DoctorProfileSerializer(doctor)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = DoctorProfileSerializer(doctor,data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            status_code = 201 if created else 200
            return Response(serializer.data, status=status_code)  


    @action(detail=False, methods=['GET'], permission_classes=[IsAuthenticated])
    def list_of_doctors(self,request):
        filtered_qs = self.filter_queryset(self.get_queryset())
        serializer = DoctorProfileSerializer(filtered_qs, many=True)
        return Response(serializer.data)
     
