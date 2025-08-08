from django.forms import ValidationError
from rest_framework import serializers

from clinical.models import Diagnosis, MedicalRecord, Prescription


class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ['id','name','code','description']


class MedicalRecordsSerializer(serializers.ModelSerializer):
    diagnosis = DiagnosisSerializer()

    class Meta:
        model= MedicalRecord
        fields = ['id','patient','diagnosis','created_at']

class CreateMedicalRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model= MedicalRecord
        fields = ['patient','diagnosis']

    def validate(self, attrs):
        user = self.context['request'].user

        if user.is_patient:
            raise ValidationError('Doctor only can create records')
        
        return attrs

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['id','medication_name','dosage','duration']

    def validate(self, attrs):
        user = self.context['request'].user

        if user.is_patient:
            raise ValidationError('Doctor only can create records')
        

        # No longer needed since i am using nested routes 
        # if not MedicalRecord.objects.filter(id=attrs['medical_record'].id).exists():
        #     raise ValidationError("Record doesn't exist")
        
        return attrs
    
    def create(self, validated_data):
        validated_data['medical_record_id'] = self.context['view'].kwargs.get('medical_record_pk')
        return super().create(validated_data)

