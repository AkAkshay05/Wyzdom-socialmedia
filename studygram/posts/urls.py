from django.urls import path

from . import views
from .views import PostListCreateView, PostDetailView, PostListView

urlpatterns = [
    path('posts/', PostListView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/create/', PostListCreateView.as_view(), name='post-create'),
]
