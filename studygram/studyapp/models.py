from django.contrib.auth.models import AbstractUser
from django.db import models

# Main User Model
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    display_name = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_url = models.URLField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)  # Track if the user has verified their email
    role=models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    Dob = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.username

# Temporary Model for Unverified Users
class UnverifiedUser(models.Model):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)  # Password should be hashed
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=150, blank=True)  # Corrected to use max_length
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    display_name = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_url = models.URLField(blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    Dob = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return self.email
