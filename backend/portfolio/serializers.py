from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Portfolio, Loan

User = get_user_model()  # Get the actual user model

class PortfolioSerializer(serializers.ModelSerializer):
    # Handle users (members) as a list of primary keys
    users = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    
    class Meta:
        model = Portfolio
        fields = ['id', 'name', 'description', 'users', 'current_balance', 'patrimonial_value', 'owner']  # Include current_balance and owner
    
    def create(self, validated_data):
        # Pop 'users' out of validated_data to handle members separately
        users = validated_data.pop('users', [])
        
        # The owner is the logged-in user provided through the view, which is already part of the validated data
        portfolio = Portfolio.objects.create(**validated_data)
        
        # Set the users (members) for the portfolio
        portfolio.members.set(users)  # 'members' field should be handled in the model
        
        return portfolio

class LoanSerializer(serializers.ModelSerializer):
    installment_value = serializers.SerializerMethodField()

    class Meta:
        model = Loan
        fields = ['id', 'portfolio', 'name', 'value_lent', 'monthly_rate', 'number_of_installments', 'installment_value']

    def get_installment_value(self, obj):
        return obj.calculate_installment_value()
