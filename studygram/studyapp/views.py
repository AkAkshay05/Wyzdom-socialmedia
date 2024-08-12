# from django.shortcuts import get_object_or_404
# from django.template.loader import render_to_string
# from django.utils.html import strip_tags
# from django.core.mail import EmailMultiAlternatives
# from django.contrib.auth.tokens import default_token_generator
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.conf import settings
# from .models import CustomUser, UnverifiedUser
# from .serializers import UserSerializer, CustomUserSerializer
# from .tokens import unverified_user_token_generator
#
# # Function to send activation email
# def send_activation_email(user, is_unverified_user=False):
#     if is_unverified_user:
#         token = unverified_user_token_generator.make_token(user)
#     else:
#         token = default_token_generator.make_token(user)
#
#     uid = urlsafe_base64_encode(force_bytes(user.pk))
#     activation_link = f"{settings.FRONTEND_URL}/verify-email/?uid={uid}&token={token}"
#
#     subject = 'Activate your account'
#     html_content = render_to_string('registration/activation_email.html', {'user': user, 'activation_link': activation_link})
#     text_content = strip_tags(html_content)
#
#     email = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, [user.email])
#     email.attach_alternative(html_content, "text/html")
#     email.send()
#
# # Signup View - Temporary user creation
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def signup(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         user = serializer.save()
#         send_activation_email(user, is_unverified_user=True)  # Send the activation email with unverified flag
#         return Response({
#             'detail': 'Verification email sent. Please check your email.',
#         }, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
# # Login View - with verification check
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request):
#     user = get_object_or_404(CustomUser, username=request.data['username'])
#     if not user.is_verified:
#         return Response({"detail": "Please verify your email before logging in."}, status=status.HTTP_401_UNAUTHORIZED)
#
#     if not user.check_password(request.data['password']):
#         return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
#
#     refresh = RefreshToken.for_user(user)
#     serializer = CustomUserSerializer(user)
#     return Response({
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#         'user': serializer.data
#     })
#
# # Test Token View
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def test_token(request):
#     return Response("Token is valid!")
#
# # Email Verification View
# @api_view(['GET'])
# @permission_classes([AllowAny])
# def verify_email(request):
#     uidb64 = request.GET.get('uid')
#     token = request.GET.get('token')
#
#     try:
#         uid = force_str(urlsafe_base64_decode(uidb64))
#         unverified_user = UnverifiedUser.objects.get(pk=uid)
#     except (TypeError, ValueError, OverflowError, UnverifiedUser.DoesNotExist) as e:
#         print(f"Verification error: {e}")
#         unverified_user = None
#
#     if unverified_user is not None and unverified_user_token_generator.check_token(unverified_user, token):
#         # Move data from UnverifiedUser to CustomUser
#         user = CustomUser.objects.create(
#             email=unverified_user.email,
#             username=unverified_user.username,
#             password=unverified_user.password,  # Password is already hashed
#             first_name=unverified_user.first_name,
#             last_name=unverified_user.last_name,
#             phone_number=unverified_user.phone_number,
#             display_name=unverified_user.display_name,
#             bio=unverified_user.bio,
#             profile_url=unverified_user.profile_url,
#             is_active=True,  # The account is now active
#             is_verified=True  # The account is now verified
#         )
#         unverified_user.delete()  # Remove the temporary unverified user data
#         return Response({'message': 'Email verified successfully! You can now log in.'}, status=status.HTTP_200_OK)
#     else:
#         return Response({'message': 'Verification link is invalid or expired.'}, status=status.HTTP_400_BAD_REQUEST)
#
#
#
# views.py

from django.shortcuts import render, get_object_or_404
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string  # Ensure this import is present
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser, UnverifiedUser
from .serializers import UserSerializer, CustomUserSerializer
from .tokens import unverified_user_token_generator
from studygram import settings  # Ensure this is correctly imported

# Function to send activation email
def send_activation_email(user):
    token = unverified_user_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_link = f"{settings.BACKEND_URL}/api/verify-email/{uid}/{token}/"

    subject = 'Activate your account'
    html_content = render_to_string('registration/activation_email.html', {'user': user, 'activation_link': activation_link})
    text_content = strip_tags(html_content)

    email = EmailMultiAlternatives(subject, text_content, settings.DEFAULT_FROM_EMAIL, [user.email])
    email.attach_alternative(html_content, "text/html")
    email.send()

# Signup View - Temporary user creation
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        send_activation_email(user)  # Send the activation email
        return Response({
            'detail': 'Verification email sent. Please check your email.',
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Email Verification View
@api_view(['GET'])
@permission_classes([AllowAny])
def verify_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        unverified_user = UnverifiedUser.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, UnverifiedUser.DoesNotExist):
        unverified_user = None

    if unverified_user is not None and unverified_user_token_generator.check_token(unverified_user, token):
        # Move data from UnverifiedUser to CustomUser
        user = CustomUser.objects.create(
            email=unverified_user.email,
            username=unverified_user.username,
            password=unverified_user.password,  # Password is already hashed
            first_name=unverified_user.first_name,
            last_name=unverified_user.last_name,
            phone_number=unverified_user.phone_number,
            display_name=unverified_user.display_name,
            bio=unverified_user.bio,
            profile_url=unverified_user.profile_url,
            is_active=True,  # The account is now active
            is_verified=True  # The account is now verified
        )
        unverified_user.delete()  # Remove the temporary unverified user data

        # Render a success template or redirect to a login page
        return render(request, 'registration/verification_success.html')

    else:
        # Render an error template
        return render(request, 'registration/verification_failed.html')
# Login View - with verification check
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    user = get_object_or_404(CustomUser, username=request.data['username'])
    if not user.is_verified:
        return Response({"detail": "Please verify your email before logging in."}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.check_password(request.data['password']):
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    serializer = CustomUserSerializer(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': serializer.data
    })