from django.urls import path
from .views import LikeCreateView, LikeListView, LikeDetailView

urlpatterns = [
    path('likes/', LikeListView.as_view(), name='like-list'),
    path('likes/create/', LikeCreateView.as_view(), name='like-create'),
    path('likes/<int:pk>/', LikeDetailView.as_view(), name='like-detail'),
]
