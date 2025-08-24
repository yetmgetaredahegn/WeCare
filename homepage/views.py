from django.http import JsonResponse

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
