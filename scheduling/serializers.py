from multiprocessing import AuthenticationError
from django.forms import ValidationError
from rest_framework import serializers

from scheduling.models import Appointment
from users.models import PatientProfile


class CreateAppointmentSerializer(serializers.ModelSerializer):
    doctor_id = serializers.IntegerField()
    class Meta:
        model=Appointment
        fields=['doctor_id','schedule_date','schedule_time']

    def validate(self, attrs):
        user = self.context['request'].user

        if user.is_doctor:
            raise ValidationError('Doctors cannot book an appointment')
        return attrs
    
    def create(self, validated_data):
        user = self.context['request'].user
        patient=PatientProfile.objects.get(user=user)
        appointment = Appointment.objects.create(patient=patient,**validated_data)
        return appointment
    
    

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id','patient_id','doctor_id','schedule_date','schedule_time','status']


class UpdateAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields=['status']

    def validate(self, attrs):
        user = self.context['request'].user

        if user.is_patient:
            raise ValidationError('Patients cannot update status')
        return attrs
    
    
    def create(self, validated_data):
        appointment_status = Appointment.objects.update('status',self.context['request'].data)
        appointment = Appointment.objects.create(status=appointment_status,**validated_data)
        return appointment