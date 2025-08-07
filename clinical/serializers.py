from rest_framework import serializers

from clinical.models import Diagnosis, MedicalRecord


class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ['id','name','code','description']


class MedicalRecordsSerializer(serializers.ModelSerializer):
    # diagnosis_field = serializers.PrimaryKeyRelatedField(
    #     queryset=Diagnosis.objects.all(),
    #     many=True,
    #     source='diagnosis'  # assumes MedicalRecord has a M2M or FK to Diagnosis called 'diagnosis'
    # )
    diagnosis = DiagnosisSerializer()

    class Meta:
        model= MedicalRecord
        fields = ['id','patient','diagnosis','created_at']

class CreateMedicalRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model= MedicalRecord
        fields = ['patient','diagnosis']

