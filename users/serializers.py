from xml.dom import ValidationErr
from django.forms import ValidationError
from djoser.serializers import UserCreatePasswordRetypeSerializer as BaseUserCreateSerializer
from rest_framework import serializers,permissions
from django.contrib.auth import get_user_model


from users.models import PatientProfile

User = get_user_model()

class UserCreatePasswordRetypeSerializer(BaseUserCreateSerializer):
    re_password = serializers.CharField(write_only=True)  

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ['id','first_name','last_name','username','password','re_password','is_doctor','is_patient']

    def validate(self, attrs):
        is_doctor = attrs.get('is_doctor',False)
        is_patient = attrs.get('is_patient',False)

        if is_doctor and is_patient:
            raise ValidationError("User can't be both doctor and pateint at the same time")
        elif not is_doctor and not is_patient:
            raise ValidationError("User should be either patient or doctor")
        return attrs
    
class PatientProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = PatientProfile
        fields = ['id','user_id','age','gender','phone']
