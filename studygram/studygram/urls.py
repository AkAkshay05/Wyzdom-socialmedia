from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/', include('studyapp.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('documents.urls')),
    path('api/', include('posts.urls')),
    path('api/', include('comments.urls')),
    path('api/', include('likes.urls')),
    path('api/', include('followers.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
