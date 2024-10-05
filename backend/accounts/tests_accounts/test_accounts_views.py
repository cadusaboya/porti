from rest_framework.test import APIClient
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from accounts.models import Hospital, User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

class ViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username="testuser", 
                                        email="teste@gmail.com", 
                                        password="12345",
                                        fullname="Test User", 
                                        cpf="12345678901", 
                                        telefone="1234567890")
        self.user.save()

        self.client.force_authenticate(user=self.user)

    def test_login(self):
        self.userlogin = User.objects.create(username="newtestuser", 
                                email="novoteste@gmail.com", 
                                fullname="Test User Tres", 
                                cpf="12345678902", 
                                telefone="1234567892")
        self.userlogin.set_password('123456')
        self.userlogin.save()
        response = self.client.post(reverse('login'), {'username': 'newtestuser', 'password': '123456'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register(self):
        response = self.client.post(reverse('register'), {'username': 'new_user', 
                                                            'password': 'password', 
                                                            'email': 'test@example.com', 
                                                            'fullname': 'test user2', 
                                                            'cpf': '01234567890', 
                                                            'telefone': '1234567890'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_profile(self):
        response = self.client.get(reverse('profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_password_reset(self):
        response = self.client.post(reverse('password_reset'), {'username': 'testuser', 'email': 'teste@gmail.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_set_new_password(self):
        # Save the user's password before generating the token
        self.user.set_password('oldpassword')
        self.user.save()

        # Generate valid token and uidb64 for testing set_new_password view
        self.token_generator = PasswordResetTokenGenerator()
        self.uidb64 = urlsafe_base64_encode(force_bytes(self.user.pk))
        self.token = self.token_generator.make_token(self.user)

        response = self.client.post(reverse('set_new_password', kwargs={'uidb64': self.uidb64, 'token': self.token}), {'password': 'newpassword'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)