from pyexpat import model
from xml.dom import ValidationErr
from django.forms import ValidationError
from djoser.serializers import UserCreatePasswordRetypeSerializer as BaseUserCreateSerializer
from rest_framework import serializers,permissions
from django.contrib.auth import get_user_model


from users.models import DoctorProfile, PatientProfile,Day

User = get_user_model()

MAX_AVATAR_SIZE = 5 * 1024 * 1024
ALLOWED_AVATAR_TYPES = {
    'image/jpeg',
    'image/png',
    'image/webp',
}

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


class UserMeSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False, allow_null=True)

    def validate_avatar(self, value):
        if value is None:
            return value

        content_type = getattr(value, 'content_type', None)
        if content_type not in ALLOWED_AVATAR_TYPES:
            raise serializers.ValidationError('Avatar must be a jpg, png, or webp image.')

        if value.size > MAX_AVATAR_SIZE:
            raise serializers.ValidationError('Avatar size must be 5MB or less.')

        return value

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'avatar',
            'is_doctor',
            'is_patient',
            'is_staff',
            'is_superuser',
            'is_active',
        )
        extra_kwargs = {
            'email': {'read_only': True},
        }
        
class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = ['id', 'name']


    
class PatientProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = PatientProfile
        fields = ['id','user_id','age','phone']


class UpdatePatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = ['age','phone']


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
    class Meta:
        model = DoctorProfile
        fields = ['specialization','bio']
