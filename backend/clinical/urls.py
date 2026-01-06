from rest_framework_nested import routers

from clinical import views

router = routers.DefaultRouter()

router.register('diagnoses',views.DiagnosesViewSet,basename='diagnosis')
router.register('medical_records', views.MedicalRecordViewSet, basename='medical_records')
medical_record_router = routers.NestedDefaultRouter(router, 'medical_records', lookup='medical_record')
medical_record_router.register('prescriptions',views.PrescriptionViewSet, basename='record-prescription')

urlpatterns = router.urls + medical_record_router.urls