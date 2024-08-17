from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser, UnverifiedUser


# Serializer for UnverifiedUser
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnverifiedUser  # Using UnverifiedUser for signup
        fields = ['id', 'username', 'password', 'email', 'phone_number', 'display_name', 'bio', 'profile_url', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])

        # Create the UnverifiedUser instance
        user = UnverifiedUser.objects.create(**validated_data)
        return user


# Serializer for CustomUser (if needed for other purposes)
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'phone_number', 'display_name', 'bio', 'profile_url', 'is_verified', 'role']
        read_only_fields = ['is_verified']  # Prevents the verified status from being set via the serializer
