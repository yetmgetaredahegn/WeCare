from rest_framework import permissions

class IsPatientPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.is_patient == True)
    

class IsDoctorPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.is_doctor == True)