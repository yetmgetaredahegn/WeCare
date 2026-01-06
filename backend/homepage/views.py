from django.http import JsonResponse
from users.models import CustomUser
from users.serializers  import UserCreatePasswordRetypeSerializer
from rest_framework.generics import CreateAPIView

def home(request):
    return JsonResponse({
        "message": "Welcome to WeCare API 🚀",
        "endpoints": {
            "Admin Panel": "/admin/",
            "Users": "/users/",
            "Scheduling": "/scheduling/",
            "Clinical": "/clinical/",
            "Login": "/auth/jwt/create/",
            "Register": "/auth/users/"
        }
    })

class RegisterApiView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserCreatePasswordRetypeSerializer
