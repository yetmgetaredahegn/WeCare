from django.urls import path
from rest_framework_nested import routers

from scheduling import views

router = routers.DefaultRouter()
router.register('appointments',views.AppointmentViewSet,basename='appointments')


urlpatterns = router.urls