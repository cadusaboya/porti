from django.test import TestCase
from accounts.models import User, Hospital, UserRequest

class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="test_user", 
                                        fullname="Test User", 
                                        cpf="12345678901", 
                                        telefone="1234567890")

    def test_user_creation(self):
        self.assertTrue(User.objects.filter(username="test_user").exists())