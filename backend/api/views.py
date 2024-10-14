from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CreateUserSerializer, LoginSerializer
from typing import Dict
from sparky_utils.advice import exception_advice
from sparky_utils.response import service_response
from rest_framework.authtoken.models import Token
from .models import CustomUser

# Create your views here.


class RootAPIView(APIView):
    """Root API View
    """
    @exception_advice
    def get(self, request, *args, **kwargs):
        """ Get handler for root api view
        """
        return service_response(status="success", message="Welcome, Glad to see you", status_code=200)


class RegisterAPIView(APIView):
    serializer_class = CreateUserSerializer

    @exception_advice
    def post(self, request, *args, **kwargs):
        """Register post handler
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            # get a token
            token, created = Token.objects.get_or_create(user=user)
            data = {
                "username": user.username,
                "token": token.key
            }
            return service_response(status="success", data=data, status_code=201, message="User Registered Successfully")

        return service_response(status="error", message=serializer.errors, status_code=400)


class LoginAPIView(APIView):
    """Login API view
    """

    serializer_class = LoginSerializer

    @exception_advice
    def post(self, request, *args, **kwargs):
        """ Login post handler
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get("username")
            user = CustomUser.objects.get(username__iexact=username)
            # get token
            token, _ = Token.objects.get_or_create(user=user)
            data = {
                "username": user.username,
                "token": token.key
            }
            return service_response(status="success", message="Login Successful", status_code=200, data=data)
        return service_response(status="error", message=serializer.errors, status_code=400)
