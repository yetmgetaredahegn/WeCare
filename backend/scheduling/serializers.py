from datetime import date
from multiprocessing import AuthenticationError
from django.forms import ValidationError
from rest_framework import serializers,status

from scheduling.models import Appointment
from users.models import DoctorProfile, PatientProfile


class CreateAppointmentSerializer(serializers.ModelSerializer):
    doctor_id = serializers.IntegerField()
    class Meta:
        model=Appointment
        fields=['doctor_id','schedule_date','schedule_time']

    def validate_doctor_id(self,value):
        if not DoctorProfile.objects.filter(pk=value).exists():
            raise ValidationError("Invalid Doctor ID")
        return value

    def validate(self, attrs):
        user = self.context['request'].user

        if user.is_doctor:
            raise ValidationError('Doctors cannot book an appointment')
        
        if attrs['schedule_date'] < date.today():
            raise ValidationError('You cannot book an appointment in the past.')
        
        if Appointment.objects.filter(
            doctor_id = attrs['doctor_id'],
            schedule_date = attrs['schedule_date'],
            schedule_time = attrs['schedule_time'],
            status__in = ['P','C']
        ).exists():
            raise ValidationError('This slot is booked for doctor')
        
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
        new_status = attrs.get('status')

        if user.is_patient and new_status != 'X':
            raise ValidationError('Patients can only cancel thier appointments')
        
        if user.is_doctor and new_status not in ['C','X']:
            raise ValidationError('Doctors can only confirm or cancel appointments')

        return attrs
    
    
    def update(self, instance, validated_data):
        instance.status = validated_data['status']
        instance.save()
        return instance