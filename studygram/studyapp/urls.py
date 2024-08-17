# from django.urls import path
# from . import views
# from .views import verify_email
#
# urlpatterns = [
#     path('signup/', views.signup, name='signup'),
#     path('login/', views.login, name='login'),
#     path('test-token/', views.test_token, name='test-token'),
#     # path('verify-email/<uidb64>/<token>/', views.verify_email, name='verify-email'),  # Corrected endpoint for email verification
#     # path('send-test-email/', views.send_test_email, name='send_test_email'),  # Assuming you have a send_test_email view
#     # path('verify-email/<str:uidb64>/<str:token>/', verify_email, name='verify-email'),
#
#     path('verify-email/<str:uidb64>/<str:token>/', verify_email, name='verify-email'),
#
# ]
from django.urls import path, include
from .views import signup, verify_email, UserListView, UserProfileView
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView
urlpatterns = [
    path('signup/', signup, name='signup'),
    path('verify-email/<str:uidb64>/<str:token>/', verify_email, name='verify-email'),
    path('login/', views.login, name='login'),
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', UserListView.as_view(), name='UserListView'),
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='user-profile'),
]



