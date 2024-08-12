from django.urls import path
from .views import CommentListCreateView, CommentDetailView,CommentCreateView

urlpatterns = [
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
    path('comments/create/', CommentCreateView.as_view(), name='like-create'),
]
