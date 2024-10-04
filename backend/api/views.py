from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CreateUserSerializer
from typing import Dict
from sparky_utils.advice import exception_advice
from sparky_utils.response import service_response
# Create your views here.


class RootAPIView(APIView):
    """Root API View
    """
    @exception_advice
    def get(self, request, *args, **kwargs):
        """ Get handler for root api view
        """
        return service_response(status="success", message="Welcome, Glad to see you", status_code=200)


# class RegisterAPIView(APIView):
    serializer_class = CreateUserSerializer
