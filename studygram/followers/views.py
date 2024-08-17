from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from rest_framework.authtoken.admin import User

from .models import Follower
from .serializers import FollowerSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from studyapp.serializers import CustomUserSerializer


class FollowerCreateView(generics.CreateAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

class FollowerListView(generics.ListAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Follower.objects.filter(follower=user)

class FollowingListView(generics.ListAPIView):
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Follower.objects.filter(follower=user)

class FollowerDetailView(generics.DestroyAPIView):
    queryset = Follower.objects.all()
    serializer_class = FollowerSerializer
    permission_classes = [permissions.IsAuthenticated]


# views.py


class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        follower = request.user
        followed = User.objects.get(id=user_id)

        if follower == followed:
            return Response({"error": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the user is already following the other user
        if Follower.objects.filter(follower=follower, followed=followed).exists():
            return Response({"error": "You are already following this user."}, status=status.HTTP_400_BAD_REQUEST)

        follow = Follower(follower=follower, followed=followed)
        follow.save()

        return Response({"success": "You are now following this user."}, status=status.HTTP_201_CREATED)



class ListUsersNotFollowedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the current logged-in user
        user = request.user

        # Get the list of user IDs that the logged-in user is already following
        followed_users = Follower.objects.filter(follower=user).values_list('followed_id', flat=True)

        # Get the list of users that the logged-in user is NOT following
        users_to_follow = User.objects.exclude(id__in=followed_users).exclude(id=user.id)

        # Serialize the data
        serializer = CustomUserSerializer(users_to_follow, many=True)
        return Response(serializer.data)