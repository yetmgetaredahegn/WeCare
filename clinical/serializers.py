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

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = ['id','medical_record','medication_name','dosage','duration']

