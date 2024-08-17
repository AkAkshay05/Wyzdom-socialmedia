# from django.shortcuts import render
#
# # Create your views here.
# from rest_framework import generics, permissions
# from .models import Like
# from .serializers import LikeSerializer
#
# class LikeCreateView(generics.CreateAPIView):
#     queryset = Like.objects.all()
#     serializer_class = LikeSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
# class LikeListView(generics.ListAPIView):
#     queryset = Like.objects.all()
#     serializer_class = LikeSerializer
#     permission_classes = [permissions.IsAuthenticated]
#
# class LikeDetailView(generics.RetrieveDestroyAPIView):
#     queryset = Like.objects.all()
#     serializer_class = LikeSerializer
#     permission_classes = [permissions.IsAuthenticated]
#


from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Like
from .serializers import LikeSerializer


class LikeToggleView(generics.GenericAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        post_id = request.data.get("post")

        # Check if the like already exists
        try:
            like = Like.objects.get(user=user, post_id=post_id)
            # Like exists, so delete it (unlike)
            like.delete()
            return Response({"message": "Post unliked"}, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            # Like does not exist, so create it
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=user)
            queryset = Like.objects.all()
            serializer_class = LikeSerializer
            permission_classes = [permissions.IsAuthenticated]
            return Response({"message": "Post liked"}, status=status.HTTP_201_CREATED)


class LikeListView(generics.ListAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]


class LikeDetailView(generics.RetrieveDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]
