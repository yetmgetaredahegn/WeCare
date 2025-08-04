from urllib import request
from django.db import router
from django.urls import path
from users import views
from rest_framework_nested import routers

router = routers.DefaultRouter()
router.register('doctor',views.DoctorProfileViewSet)
router.register('patient', views.PatientProfileViewSet)

urlpatterns = router.urls