from pyexpat import model
from xml.dom import ValidationErr
from django.forms import ValidationError
from djoser.serializers import UserCreatePasswordRetypeSerializer as BaseUserCreateSerializer
from rest_framework import serializers,permissions
from django.contrib.auth import get_user_model


from users.models import DoctorProfile, PatientProfile,Day

User = get_user_model()

class UserCreatePasswordRetypeSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ('first_name','last_name') + BaseUserCreateSerializer.Meta.fields + ('is_doctor', 'is_patient')

    def validate(self, attrs):
        is_doctor = attrs.get('is_doctor', False)
        is_patient = attrs.get('is_patient', False)

        if is_doctor and is_patient:
            raise ValidationError("User can't be both doctor and patient at the same time")
        elif not is_doctor and not is_patient:
            raise ValidationError("User must be either a doctor or a patient")
        return super().validate(attrs)

    def create(self, validated_data):
        try:
            # call manager directly
            user = User.objects.create_user(
                email=validated_data["email"],
                password=validated_data["password"],
                first_name=validated_data.get("first_name", ""),
                last_name=validated_data.get("last_name", ""),
                is_doctor=validated_data.get("is_doctor", False),
                is_patient=validated_data.get("is_patient", False),
            )
        except Exception as e:
            raise serializers.ValidationError({"detail": str(e)})

        if user.is_patient:
            PatientProfile.objects.create(user=user)

        if user.is_doctor:
            DoctorProfile.objects.create(user=user)

        return user
        
class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ['id', 'name']


    
class PatientProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = PatientProfile
        fields = ['id','user_id','age','gender','phone']


class UpdatePatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ['age','gender','phone']


class DoctorProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    available_days = serializers.SlugRelatedField(
        slug_field = 'name',
        queryset = Day.objects.all(),
        many = True
        )
    
    class Meta:
        model = DoctorProfile
        fields = ['id','user','user_id','specialization','bio','available_days']
    
    def get_user(self, obj):
        return f"Dr {obj.user.first_name}"

class UpdateDoctorProfileSerializer(serializers.ModelSerializer):
    available_days = serializers.SlugRelatedField(
        slug_field = 'name',
        queryset = Day.objects.all(),
        many = True
        )
    class Meta:
        model = DoctorProfile
        fields = ['specialization','bio','available_days']
