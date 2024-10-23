from django.urls import path
from .views import RegisterAPIView, LoginAPIView
from .views import LarkAPIView

urlpatterns = [
    path("auth/register", RegisterAPIView.as_view(), name="register"),

    path("auth/login", LoginAPIView.as_view(), name="login"),

    path('send_lark_message/', LarkAPIView.send_lark_message, name='send_lark_message'),
]

