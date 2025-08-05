from rest_framework import serializers

from clinical.models import Diagnosis, MedicalRecord


class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model=Diagnosis
        fields=['id','name','code','description']


class MedicalRecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model=MedicalRecord
        fields = ['id','patient','doctor','diagnosis','created_at']

