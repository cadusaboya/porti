from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('user/profile/', views.user_profile, name='profile'),
    path('password_reset/', views.password_reset, name='password_reset'),
    path('reset-password/<uidb64>/<token>/', views.set_new_password, name='set_new_password'),
]