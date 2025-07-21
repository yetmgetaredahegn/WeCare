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

