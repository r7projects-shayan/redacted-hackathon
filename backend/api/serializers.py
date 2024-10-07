from rest_framework import serializers
from django.contrib.auth import get_user_model
from sparky_utils.exceptions import ServiceException
from typing import Dict
from .models import CustomUser
import re


User = get_user_model()


class CreateUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True, required=True, min_length=8)
    password2 = serializers.CharField(
        write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ("username", "password1", "password2")

    # validate password strength
    def validate_password1(self, password1):
        """Validate user's inputed password on signup

        Args:
            password1 (str): user's password

        Raises:
            serializers.ValidationError: raise password requirements

        Returns:
            str: returns the validated password
        """
        # Regex pattern to match at least one digit, one uppercase letter,
        # one lowercase letter, one special character, and length >= 8
        regex_pattern = (
            r"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        )
        if not re.match(regex_pattern, password1):
            raise serializers.ValidationError(
                "Password must contain at least one digit, "
                "one uppercase letter, one lowercase letter, "
                "one special character, and length >= 8"
            )
        return password1

    # validate payload

    def validate(self, attrs) -> Dict[str, str]:
        password1: str = attrs.get("password1")
        password2: str = attrs.get("password2")

        # check if username exist
        if password1 != password2:
            raise ServiceException(
                message="Passwords does not match!", status_code=400)

        return attrs

    # create user

    def create(self, validated_data) -> CustomUser:
        """ Create the new user when serializer dot save is called

        Args:
            validated_data (Dict): User registration payload
        """
        user = User.objects.create_user(
            username=validated_data["username"], password=validated_data["password1"])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
