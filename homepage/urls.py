from django.urls import path
from django.views.generic import TemplateView
from rest_framework_nested import routers
from . import views




# URLConf
urlpatterns = [
    path('home/', TemplateView.as_view(template_name='home/index.html')),
    path('', TemplateView.as_view(template_name='home/index.html')),
    path('register/', TemplateView.as_view(template_name='register/register.html')),
    path('login/', TemplateView.as_view(template_name='login/login.html')),
]
