# from django.urls import path
#
# from . import views
# from .views import PostListCreateView, PostDetailView, PostListView
#
# urlpatterns = [
#     path('posts/', PostListView.as_view(), name='PostListView'),
#     path('posts/<int:pk>/', PostDetailView.as_view(), name='PostDetailView'),
#     path('posts/create/', PostListCreateView.as_view(), name='PostListCreateView'),
# ]
from django.urls import path
from .views import PostListCreateView, PostDetailView

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='PostListCreateView'),  # Ensure trailing slash
    path('posts/<int:pk>/', PostDetailView.as_view(), name='PostDetailView'),  # Ensure trailing slash
]
