from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import CreateUserSerializer, LoginSerializer
from typing import Dict
from sparky_utils.advice import exception_advice
from sparky_utils.response import service_response
from rest_framework.authtoken.models import Token
from .models import CustomUser

# Create your views here.
import os
from django.http import JsonResponse
from larksuiteoapi import Config, DefaultLogger, LEVEL_DEBUG
from larksuiteoapi.service.im.v1 import MessageService
# from larksuiteoapi.service.auth.v3 import AppAccessTokenReqBody, AppAccessTokenRespBody # type: ignore
# from larksuiteoapi.token import AppAccessTokenManager
# from larksuiteoapi import Client

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

class LarkAPIView(APIView):
    # Load Lark app settings from environment or Django settings
    APP_ID = os.getenv('LARK_APP_ID') or 'bubble_lark_app_id'
    APP_SECRET = os.getenv('LARK_APP_SECRET') or 'bubble_lark_app_secret'

    def send_lark_message(request):
        # Getting the client
        conf = Config.new_internal_app(APP_ID, APP_SECRET, DefaultLogger(level=LEVEL_DEBUG))
        client = Client(conf)

        # Replace 'open_id' with a valid recipient open_id
        recipient_open_id = request.GET.get('open_id', 'default_open_id')  
        message_content = request.GET.get('message', 'Hello from Django!')

        # Preparing the request body
        req_body = CreateMessageReqBody(
            receive_id_type='open_id',
            content=f'{{"text":"{message_content}"}}',
            msg_type='text'
        )

        try:
            # Sending the message via Lark API
            resp = client.im.v1.message.create(body=req_body, params={'receive_id': recipient_open_id})
            
            if resp.code == 0:
                return JsonResponse({"status": "success", "message_id": resp.data.message_id})
            else:
                return JsonResponse({"status": "error", "error": resp.msg}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "error": str(e)}, status=500)