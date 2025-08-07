from rest_framework_nested import routers

from clinical import views

router = routers.DefaultRouter()

router.register('diagnoses',views.DiagnosesViewSet,basename='diagnosis')
router.register('medical_records', views.MedicalRecords, basename='records')

urlpatterns = router.urls