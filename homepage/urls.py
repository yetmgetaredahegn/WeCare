from django.urls import path
from django.views.generic import TemplateView
from . import views

# URLConf
urlpatterns = [
    path('home/', views.home),
    path('', TemplateView.as_view(template_name='home/index.html'))
]
