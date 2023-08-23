from django.urls import path, include
from .views import HelloAPI
from .views import randomAPI

urlpatterns = [
    path("hello/", HelloAPI),
    path("random/<int:id>/",randomAPI)
    
]