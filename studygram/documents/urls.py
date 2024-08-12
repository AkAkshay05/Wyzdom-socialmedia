# documents/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('documents/', views.DocumentListView.as_view(), name='document-list'),
    path('documents/create/', views.DocumentCreateView.as_view(), name='document-create'),
    path('documents/<int:pk>/', views.DocumentDetailView.as_view(), name='document-detail'),
]
