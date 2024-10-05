from rest_framework import status # type: ignore
from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from django.contrib.auth import authenticate # type: ignore
from django.middleware.csrf import get_token # type: ignore
from .serializers import UserSerializer # type: ignore
from rest_framework.decorators import api_view, permission_classes # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework import status # type: ignore
from django.contrib.auth import authenticate # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore
from rest_framework.permissions import IsAuthenticated # type: ignore
from django.utils.encoding import force_str  # type: ignore
from django.shortcuts import redirect # type: ignore
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode # type: ignore
from django.utils.encoding import force_bytes # type: ignore
from django.core.mail import send_mail # type: ignore
from django.http import JsonResponse # type: ignore
from .models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator # type: ignore

@api_view(['POST'])
def login(request):
    """
    Handle user login.
    """
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        response_data = {
            'message': 'Login successful',
            'token': str(refresh.access_token),
        }
        return Response(response_data, status=status.HTTP_200_OK)
    else:
        # Check if username exists in the database
        if User.objects.filter(username=username).exists():
            # Username exists, password is incorrect
            response_data = {
                'message': 'Senha incorreta',
            }
        else:
            # Username doesn't exist
            response_data = {
                'message': 'Usuário não encontrado',
            }
        return Response(response_data, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def register(request):
        
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        response_data = {'data': serializer.data, 'message': 'User created successfully'}
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def password_reset(request):
    username = request.data.get('username')
    email = request.data.get('email')

    # Check if a user with the provided username or email exists
    try:
        user = User.objects.get(username=username, email=email)

        # Generate a token for password reset
        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        # Send password reset email
        reset_url = f'https://cadusaboya.github.io/Forgot-Password/?uidb64={uid}&token={token}'
        send_mail(
            'Password Reset Request',
            f'Click the following link to reset your password: {reset_url}',
            'suporte@factorpa.xyz',
            [user.email],
            fail_silently=False,
        )
        return JsonResponse({'message': 'Password reset email sent'}, status=200)  # You can customize the response message as needed
    except:
        return JsonResponse({'error': 'User does not exist'}, status=400)

@api_view(['POST'])
def set_new_password(request, uidb64, token):
    new_password = request.data.get('password')

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        return JsonResponse({'error': 'Invalid token'}, status=400)

    token_generator = PasswordResetTokenGenerator()
    if token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return JsonResponse({'message': 'Password has been reset'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid token'}, status=405)