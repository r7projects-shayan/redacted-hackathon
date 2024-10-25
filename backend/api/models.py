from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from typing import Any
from django.db import transaction
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
# Create your models here.

class CustomUserManager(UserManager):

    # validate email
    @staticmethod
    def validate_email(email: str) -> None:
        """
        This method validates the email address of a user.
        """
    # create user method

    def create_user(
        self, username: str, password: str = "", **extra_fields: Any
    ) -> Any:
        """
        This method creates a user with the specified email address, username, and password.
        """
        if not username:
            raise ValidationError(message="Users must have a username")
        with transaction.atomic():
            user = self.model(username=username, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
            return user

    def create_superuser(self, username: str, password: str, **extra_fields: Any) -> Any:
        """
        This method creates a superuser with the specified email address, username, and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        if not password:
            raise ValueError("Password must be provided")

        user = self.create_user(username, password, **extra_fields)

        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    objects = CustomUserManager()
    username = models.CharField(
        verbose_name=_("Username"),
        max_length=30,
        unique=True,)
    xp = models.IntegerField(default=0)
    tokens = models.IntegerField(default=0)
    potions = models.IntegerField(default=0)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_(
            "Designates whether the user can log into this admin site."),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    USERNAME_FIELD = "username"

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
