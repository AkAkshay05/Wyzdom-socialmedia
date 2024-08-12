from rest_framework import serializers
from .models import Like

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post']
        read_only_fields = ['user']  # Automatically set user based on the JWT token

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user  # Automatically set the user based on the JWT token
        return super().create(validated_data)
