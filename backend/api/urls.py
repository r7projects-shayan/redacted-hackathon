from django.urls import path
from .views import RegisterAPIView

urlpatterns = [
    path("users", RegisterAPIView.as_view(), name="register")
]
