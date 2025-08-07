from rest_framework import serializers

from clinical.models import Diagnosis, MedicalRecord


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

