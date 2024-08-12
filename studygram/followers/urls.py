from django.urls import path
from .views import FollowerCreateView, FollowerListView, FollowingListView, FollowerDetailView, FollowUserView

urlpatterns = [
    path('followers/', FollowerListView.as_view(), name='follower-list'),
    path('following/', FollowingListView.as_view(), name='following-list'),
    path('followers/create/', FollowerCreateView.as_view(), name='follower-create'),
    path('followers/<int:pk>/', FollowerDetailView.as_view(), name='follower-detail'),
    path('follow/<int:user_id>/', FollowUserView.as_view(), name='follow_user'),
]
